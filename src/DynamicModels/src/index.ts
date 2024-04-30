import { cloneVNode, createVNode, defineComponent, inject, onMounted, Ref, renderList, resolveComponent, shallowRef, toValue } from 'vue';
import { DynamicModelsField, DynamicModelsProps } from './interface';
import { isType, ObjectOmit, toDynamicAttrs } from '../../utils';
import { useHookRefs, useHookValue } from '../../hooks';

export default defineComponent({
  name: 'DynamicModels',
  props: DynamicModelsProps,
  setup(props, { attrs, expose }) {
    const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', shallowRef({}));
    const rootValues = inject<Ref<Record<string, any>>>('dynamic-values', shallowRef({}));
    const modelValue = useHookValue(props.prop, rootValues);
    //
    const defaultType = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input'];
    const component = models.value[props.field] ?? (!defaultType.includes(props.field) ? resolveComponent(props.field) : props.field);
    const { refCore, onLoadRef, onAddRefs } = useHookRefs();
    onMounted(() => onLoadRef());
    expose({});
    return () => {
      if (!props.show) return null;
      const newProps = ObjectOmit(toDynamicAttrs({
        ...attrs,
        modelValue: modelValue.value,
        rootValues: toValue(rootValues),
      }, ['\\{', '\\}']), ['rootValues']);
      // newProps 已经改变但无法映射到 dom 上
      return createVNode(component, { ...newProps, ref: refCore, 'onUpdate:modelValue': (v: any) => modelValue.value = v }, handlerChild(props, onAddRefs));
    };
  },
});

function handlerChild(props: DynamicModelsField, onAddRefs: (key: number, ref?: any) => Function) {
  const DynamicModules = createVNode(resolveComponent('DynamicModels'));
  return Object.entries({
    ...props.slots,
    default: [].concat(props.children, props.slots['default'] || []),
  }).reduce(function (prev: Record<string, Function>, [key, children]) {
    return Object.assign(prev, {
      [key]: (slotData: any) => renderList(children, function (child, child_key) {
        if (!isType(child, 'object')) return child;
        return cloneVNode(DynamicModules, { key: child_key, ref: onAddRefs(child_key, child.ref), ...child, ...slotData });
      }),
    });
  }, {});
}
