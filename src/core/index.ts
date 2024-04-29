import { App, cloneVNode, computed, createVNode, defineComponent, inject, onMounted, PropType, reactive, renderList, resolveComponent, shallowRef, toRefs, toValue } from 'vue';
import { useHookRefs } from '../hooks';
import { isType } from '../utils';

export interface BaseField {
  /* 标识 */
  field: string; // field 标识渲染组件
  /* 显示 */
  show?: boolean;
  /* 属性 */
  prop?: string; // 为组件 v-model 添加
  /* 静态属性 */
  attrs?: Record<string, any>;
  /* 动态属性 */
  dynamicAttrs?: Record<string, string>;
  /* 子节点 */
  children?: BaseField[] | BaseField | any;
  /* 插槽 */
  slots?: Record<string, BaseField['children']>;
}

export const DynamicModels = defineComponent({
  name: 'DynamicModels',
  props: {
    show: { type: Boolean as PropType<BaseField['show']>, default: () => true },
    attrs: { type: Object as PropType<BaseField['attrs']>, default: () => ({}) },
    slots: { type: Object as PropType<BaseField['slots']>, default: () => ({}) },
    prop: { type: String as PropType<BaseField['prop']>, default: () => undefined },
    field: { type: String as PropType<BaseField['field']>, default: () => (''), required: true },
    children: { type: [Array, Object, String] as PropType<BaseField['children']>, default: () => [] },
    dynamicAttrs: { type: [Object, Array] as PropType<BaseField['dynamicAttrs']>, default: () => ([]) },
  },
  setup(props, { expose, attrs }: any) {
    const modules = inject('dynamic-modules', shallowRef({}));
    // 无法解析会出现 Vue 警告
    const module = computed(() => modules.value[props.field] || resolveComponent(props.field));
    const show = computed(() => !module.value ? false : props.show);
    const { refCore: ref, onAddRefs, onLoadRef } = useHookRefs();
    onMounted(() => onLoadRef());
    expose({});
    return () => {
      if (!show.value) return null;
      return createVNode(module.value, { ...handleAttrs(props, attrs), ref }, handleChildren(props.slots, props.children, onAddRefs));
    };
  },
});

// 处理属性
function handleAttrs({ attrs: propsAttrs, dynamicAttrs }: BaseField, attrs: Record<string, any>) {
  let [props, propsKey] = [Object.assign({}, propsAttrs, attrs), dynamicAttrs as unknown as string[]];
  if (!Array.isArray(dynamicAttrs)) {
    [props, propsKey] = [Object.assign({}, propsAttrs, attrs, dynamicAttrs), Object.keys(dynamicAttrs)];
  }
  //
  const target = reactive(props);
  const dynamicTarget: Record<string, any> = {};
  for (const key of propsKey) {
    if (!dynamicTarget[key]) dynamicTarget[key] = new Function(...Object.keys(target), `return ${ props[key] }`);
    props[key] = dynamicTarget[key](...Object.values(target));
  }
  //
  return target;
}

// 处理子节点
function handleChildren(slots: BaseField['slots'], children: BaseField['children'], onAddRefs: Function) {
  const newSlots: BaseField['slots'] = { ...slots, default: [].concat(children, slots['default'] || []) };
  const childDom = createVNode(resolveComponent(DynamicModels.name));
  //
  return Object.keys(newSlots).reduce((prev, curr) => {
    prev[curr] = (slotData: any) => renderList(newSlots[curr], (child, key: number) => {
      if (!isType(child, 'Object')) return child; // 不需要递归
      return cloneVNode(childDom, { ...child, ...slotData, key, ref: onAddRefs(key, child.ref) }); // 展开 child, slotData
    });
    return prev;
  }, {});
}

DynamicModels.install = (app: App) => {
  app.component('DynamicModels', DynamicModels);
};

export default DynamicModels;
