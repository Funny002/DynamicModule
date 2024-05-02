import { DropdownField } from '../../DynamicDropdown';
import { ButtonField } from '../../DynamicButton';
import { PropType } from 'vue';

export interface ButtonGroupField {
  max?: number; // 最大按钮数量
  group?: boolean; // 是否分组
  dropdownText?: string; // 下拉框文本
  dropdown?: DropdownField; // 下拉框配置
  options: Array<ButtonField & { name: string } | string>; // 按钮配置
}

export const ButtonGroupProps = {
  max: { type: Number as PropType<ButtonGroupField['max']>, default: 0 },
  group: { type: Boolean as PropType<ButtonGroupField['group']>, default: false },
  options: { type: Array as PropType<ButtonGroupField['options']>, default: () => [] },
  dropdown: { type: Object as PropType<ButtonGroupField['dropdown']>, default: () => ({}) },
  dropdownText: { type: String as PropType<ButtonGroupField['dropdownText']>, default: () => '更多' },
};

export const DynamicButtonGroupMap = {
  success: { name: 'success', label: '成功', type: 'success' },
  warning: { name: 'warning', label: '警告', type: 'warning' },
  danger: { name: 'danger', label: '危险', type: 'danger' },
  remove: { name: 'remove', label: '删除', type: 'danger' },
  edit: { name: 'edit', label: '编辑', type: 'primary' },
  view: { name: 'view', label: '查看', type: 'primary' },
  info: { name: 'info', label: '信息', type: 'info' },
};
