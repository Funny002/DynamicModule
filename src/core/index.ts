import { cloneVNode, createVNode, defineComponent, inject, onMounted, PropType, Ref, resolveComponent, shallowRef } from 'vue';
import { useHookRefs, useHookValue } from '../hooks';
import { isType, LoggerMessage } from '../utils';

export interface BaseField {
  field: string;
  show?: boolean;
  props?: string;
  slotData?: Record<string, any>;
  children?: Array<BaseField> | BaseField;
  slots?: Record<string, Array<BaseField> | BaseField>;
}

function handleChildren(slots: Record<string, any | any[]>, children: any | any[], onAddRefs: (key: string, ref: any) => (ref: any) => void) {
  const target = Object.assign({}, slots || {});
  if (children) target.default = (target.default || []).concat(children);
  if (!Object.keys(target).length) return undefined;
  //
  const DynamicModules = createVNode(resolveComponent('DynamicModules'));
  const result: Record<string, Function> = {};
  for (const keys in target) {
    if (isType(target[keys], 'String')) {
      result[keys] = () => target[keys];
    } else {
      result[keys] = (slotData: any) => target[keys].map((item: any, index: number) => {
        if (isType(item, 'String')) return item;
        const key = `${ keys }-${ index }`;
        return cloneVNode(DynamicModules, { ...item, key, ref: onAddRefs(key, item.ref), slotData });
      });
    }
  }
  //
  return result;
}

export const DynamicModules = defineComponent({
  name: 'DynamicModules',
  props: {
    field: { type: String as PropType<BaseField['field']>, default: '', required: true },
    // 属性
    show: { type: Boolean as PropType<BaseField['show']>, default: true },
    props: { type: String as PropType<BaseField['props']>, default: '' },
    // 插槽
    slots: { type: Object as PropType<BaseField['slots']>, default: () => ({}) },
    slotData: { type: Object as PropType<BaseField['slotData']>, default: () => ({}) },
    children: { type: [Array, String] as PropType<BaseField['children']>, default: () => '' },
  },
  setup(props, { attrs, expose }: any) {
    // inject
    const logger = inject<LoggerMessage | Console>('logger-message', console);
    const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', shallowRef({}));
    // component
    const defaultType = ['div', 'span', 'p'];
    const component = models.value[props.field] || !defaultType.includes(props.field) ? resolveComponent(props.field) : props.field;
    if (isType(component, 'String') && !defaultType.includes(props.field)) logger.warn(`%s Failed to resolve component: %s`, 'Dynamic Modules', props.field);
    // refs , value
    const modelValue = useHookValue(props.props, inject<Ref<Record<string, any>>>('dynamic-values', shallowRef({})));
    const { refCore, onLoadRef, onAddRefs } = useHookRefs();
    onMounted(() => onLoadRef());
    // render
    expose({});
    return () => {
      if (!props.show) return null;
      return createVNode(component, { ...attrs, ref: refCore, modelValue: modelValue.value, 'onUpdate:modelValue': (v: any) => modelValue.value = v }, handleChildren(props.slots, props.children, onAddRefs));
    };
  },
});

DynamicModules.install = (app: any) => {
  app.component('DynamicModules', DynamicModules);
};
