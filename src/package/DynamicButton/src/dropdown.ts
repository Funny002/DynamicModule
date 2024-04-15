import { ButtonProps, ElButton, ElDropdown, ElDropdownItem } from 'element-plus';
import { createVNode, defineComponent, PropType, renderList } from 'vue';
import { ObjectOmit } from '../../../utils';

interface ButtonDropdownField {
  label: string;
  options: { name: string; label: string; icon?: any; disabled?: boolean; divided?: boolean }[];
}

export const DynamicDropdown = defineComponent({
  name: 'DynamicDropdown',
  props: {
    button: { type: Object as PropType<ButtonProps>, default: () => ({}) },
    label: { type: String as PropType<ButtonDropdownField['label']>, default: '更多' },
    options: { type: Array as PropType<ButtonDropdownField['options']>, default: () => [] },
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
