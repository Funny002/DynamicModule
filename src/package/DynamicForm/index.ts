import { App, cloneVNode, computed, createVNode, defineComponent, inject, onMounted, PropType, provide, renderList, shallowRef } from 'vue';
import { ColProps, RowProps, FormProps, ElForm, ElRow, ElCol } from 'element-plus';
import { BaseField, DynamicModules } from '../../core';
import { isType, ObjectOmit } from '../../utils';
import { useHookRefs } from '../../hooks';
import { Ref } from 'vue';

export interface FormField extends Omit<BaseField, 'field' | 'slots'> {
  row?: RowProps; // 行属性
  modules?: Record<string, any>; // 附加组件
  modelValue?: Record<string, any>; // 表单数据
  children?: (FormItemField | any)[]; // 子内容
  form?: Partial<Omit<FormProps, 'model' | 'rules'>>; // 表单属性
  rules?: Record<string, Array<Record<string, any>>>; // 表单验证
}

export type FormItemField = BaseField & { col?: ColProps; };

export const DynamicForm = defineComponent({
  name: 'DynamicForm',
  props: {
    show: { type: Boolean as PropType<BaseField['show']>, default: true },
    children: { type: Array as PropType<FormField['children']>, default: () => [] },
    slotData: { type: Object as PropType<BaseField['slotData']>, default: () => ({}) },
    //
    row: { type: Object as PropType<FormField['row']>, default: () => ({}) },
    form: { type: Object as PropType<FormField['form']>, default: () => ({}) },
    rules: { type: Object as PropType<FormField['rules']>, default: () => ({}) },
    modules: { type: Object as PropType<FormField['modules']>, default: () => ({}) },
    modelValue: { type: Object as PropType<FormField['modelValue']>, default: () => ({}) },
  },
  emits: ['change'],
  setup(props, { expose, emit }) {
    // values
    const values = inject<Ref<{ [key: string]: any }>>('dynamic-values', shallowRef(props.modelValue));
    provide('dynamic-values', values);
    // models
    const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', shallowRef({}));
    provide('dynamic-modules', computed(() => ({ ...models.value, ...props.modules })));
    // emits
    provide('dynamic-emits', inject('dynamic-emits', emit));
    // refs
    const { refCore, onLoadRef, onAddRefs } = useHookRefs();
    onMounted(() => onLoadRef());
    // render
    expose({});
    return () => {
      return createVNode(ElForm, { ...props.form, model: values.value, rules: props.rules, ref: refCore }, {
        default: () => {
          return createVNode(ElRow, props.row, {
            default: () => {
              const defaultNode = createVNode(DynamicModules);
              return renderList(props.children, (child, index) => {
                return createVNode(ElCol, child.col || {}, {
                  default: () => {
                    if (isType(child, 'String')) return [child];
                    return [cloneVNode(defaultNode, { ...ObjectOmit(child, ['col']), ref: onAddRefs(`default-${ index }`) })];
                  },
                });
              });
            },
          });
        },
      });
    };
  },
});

DynamicForm.install = (app: App) => {
  app.component('DynamicForm', DynamicForm);
};

export default DynamicForm;
