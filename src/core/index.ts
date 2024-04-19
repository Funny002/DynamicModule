import { App, cloneVNode, computed, createVNode, defineComponent, inject, onMounted, PropType, renderList, resolveComponent, shallowRef } from 'vue';
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
  dynamic?: Record<string, string>;
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
    dynamic: { type: [Object, Array] as PropType<BaseField['dynamic']>, default: () => ([]) },
    field: { type: String as PropType<BaseField['field']>, default: () => (''), required: true },
    children: { type: [Array, Object, String] as PropType<BaseField['children']>, default: () => [] },
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
      const newProps = { ...handleAttrs(props, attrs), ref };
      return createVNode(module.value, newProps, handleChildren(props.slots, props.children, onAddRefs));
    };
  },
});

// 处理属性
function handleAttrs(props: BaseField, attrs: Record<string, any>) {
  const newProps: Record<string, any> = Object.assign({}, attrs, props.attrs);
  console.log(newProps, props.dynamic);
  // const newProps = Object.assign({ ...ctx.attrs, ref: refCore }, props.attrs, props.slotData, handleDynamicAttrs(props.dynamic, props));
  return {};
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
