import { ButtonProps, ElButton, ElDropdown, ElDropdownItem } from 'element-plus';
import { createVNode, defineComponent, PropType, renderList } from 'vue';
import { ObjectOmit } from '../../utils';

export interface DropdownField {
  label?: string; // 文本
  button?: ButtonProps; // 按钮属性
  options: { name: string; label: string; icon?: any; disabled?: boolean; divided?: boolean }[]; // 下拉框选项
}

export const DynamicDropdown = defineComponent({
  name: 'DynamicDropdown',
  props: {
    label: { type: String as PropType<DropdownField['label']>, default: '下拉框' },
    options: { type: Array as PropType<DropdownField['options']>, default: () => [] },
    button: { type: Object as PropType<DropdownField['button']>, default: () => ({}) },
  },
  setup(props, { attrs, expose }) {
    expose({});
    return () => {
      return createVNode(ElDropdown, attrs, {
        default: () => createVNode(ElButton, props.button, {
          default: () => props.label,
        }),
        dropdown: () => {
          return renderList(props.options, (item, key) => {
            return createVNode(ElDropdownItem, { ...ObjectOmit(item, ['label', 'name']), command: item.name, key }, {
              default: () => item.label,
            });
          });
        },
      });
    };
  },
});
