import { ColProps, FormProps } from 'element-plus/lib/components';
import { BaseField } from '../../../core';

export interface Field extends BaseField {
  col: ColProps; // col
}

export type ElementForm = Omit<FormProps, 'model'>
