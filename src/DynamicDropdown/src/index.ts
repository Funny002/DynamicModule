import { ElButton, ElDropdown, ElDropdownItem } from 'element-plus';
import { createVNode, defineComponent, renderList } from 'vue';
import { DynamicDropdownProps } from './interface';
import { ObjectOmit } from '../../utils';

export default defineComponent({
  name: 'DynamicDropdown',
  props: DynamicDropdownProps,
  setup(props, { attrs, expose }) {
    expose({});
    return () => {
      return createVNode(ElDropdown, attrs, {
        default: () => createVNode(ElButton, props.button, {
          default: () => props.label,
        }),
        dropdown: () => renderList(props.options, (item, key) => {
          return createVNode(ElDropdownItem, { ...ObjectOmit(item, ['label', 'name']), command: item.name, key }, {
            default: () => item.label,
          });
        }),
      });
    };
  },
});
