import { ColProps, RowProps, FormProps } from 'element-plus';
import { BaseField } from '../../../core';

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
