import { ColProps, FormProps, RowProps } from 'element-plus';
import { DynamicModelsField } from '../../DynamicModels';
import { PropType } from 'vue';

export interface FormField extends Omit<DynamicModelsField, 'field' | 'slots'> {
  row?: RowProps; // 行属性
  modules?: Record<string, any>; // 附加组件
  modelValue?: Record<string, any>; // 表单数据
  children?: (FormItemField | any)[]; // 子内容
  form?: Partial<Omit<FormProps, 'model' | 'rules'>>; // 表单属性
  rules?: Record<string, Array<Record<string, any>>>; // 表单验证
}

export type FormItemField = DynamicModelsField & { col?: ColProps; };

export const DynamicFormProps = {
  show: { type: Boolean as PropType<DynamicModelsField['show']>, default: true },
  children: { type: Array as PropType<FormField['children']>, default: () => [] },
  //
  row: { type: Object as PropType<FormField['row']>, default: () => ({}) },
  form: { type: Object as PropType<FormField['form']>, default: () => ({}) },
  rules: { type: Object as PropType<FormField['rules']>, default: () => ({}) },
  modules: { type: Object as PropType<FormField['modules']>, default: () => ({}) },
  modelValue: { type: Object as PropType<FormField['modelValue']>, default: () => ({}) },
};
