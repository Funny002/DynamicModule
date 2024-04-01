import { ColProps, RowProps, FormProps, FormItemProp } from 'element-plus/lib/components';

export interface Field {
  col: ColProps; // col
  children: Field[]; // children
  formItem: FormItemProp; // formItem
}
