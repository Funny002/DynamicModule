import { App, cloneVNode, createVNode, defineComponent, PropType } from 'vue';
import { ColProps, RowProps, FormProps, ElForm, ElRow } from 'element-plus';
import { BaseField, DynamicModules } from '../../core';
import { isType } from '../../utils';

export interface FormField extends Omit<BaseField, 'field' | 'slots'> {
  row?: RowProps; // 行属性
  modules?: Record<string, any>; // 附加组件
  modelValue?: Record<string, any>; // 表单数据
  fields?: (FormItemField | any)[]; // 子内容 - 别名
  children?: (FormItemField | any)[]; // 子内容
  form?: Partial<Omit<FormProps, 'model' | 'rules'>>; // 表单属性
  rules?: Record<string, Array<Record<string, any>>>; // 表单验证
}

export type FormItemField = BaseField & { col: ColProps; } | BaseField;

export const DynamicForm = defineComponent({
  name: 'DynamicForm',
  props: {
    show: { type: Boolean as PropType<BaseField['show']>, default: true },
    props: { type: String as PropType<BaseField['props']>, default: '' },
    slotData: { type: Object as PropType<BaseField['slotData']>, default: () => ({}) },
    children: { type: [Array, String] as PropType<BaseField['children']>, default: () => '' },
    //
    row: { type: Object as PropType<FormField['row']>, default: () => ({}) },
    form: { type: Object as PropType<FormField['form']>, default: () => ({}) },
    rules: { type: Object as PropType<FormField['rules']>, default: () => ({}) },
    modules: { type: Object as PropType<FormField['modules']>, default: () => ({}) },
    fields: { type: [Array, String] as PropType<FormField['fields']>, default: () => [] },
    modelValue: { type: Object as PropType<FormField['modelValue']>, default: () => ({}) },
  },
  setup(props, { expose }) {
    console.log(props);
    // render
    expose({});
    return () => {
      return createVNode(ElForm, { ...props.form, model: props.modelValue, rules: props.rules }, {
        default: () => {
          return createVNode(ElRow, {}, {
            default: () => {
              const node = createVNode(DynamicModules);
              return [].concat(props.fields || props.children).map(child => {
                if (isType(child, 'String')) return child;
                return cloneVNode(node, child);
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
// {
// default: () => {
//   const node = createVNode(DynamicModules);
//   return [].concat(props.fields || props.children).map(child => {
//     if (isType(child, 'String')) return child;
//     return cloneVNode(node, child);
//   });
// },
// }