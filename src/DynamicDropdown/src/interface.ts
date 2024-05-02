import { ButtonProps } from 'element-plus';
import { PropType } from 'vue';

export interface DropdownField {
  label?: string; // 文本
  button?: ButtonProps; // 按钮属性
  options: { name: string; label: string; icon?: any; disabled?: boolean; divided?: boolean }[]; // 下拉框选项
}

export const DynamicDropdownProps = {
  label: { type: String as PropType<DropdownField['label']>, default: '下拉框' },
  options: { type: Array as PropType<DropdownField['options']>, default: () => [] },
  button: { type: Object as PropType<DropdownField['button']>, default: () => ({}) },
};
