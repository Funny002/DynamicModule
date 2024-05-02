import { ButtonProps } from 'element-plus';

export interface ButtonField extends ButtonProps {
  label: string; // 按钮文字
}

export const DynamicButtonProps = {
  label: { type: String, default: '' },
};
