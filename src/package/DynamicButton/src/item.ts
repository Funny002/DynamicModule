import { createVNode, defineComponent, PropType } from 'vue';
import { ElButton } from 'element-plus';

export interface ButtonItemField {
  label: string; // 按钮文本
}

export const DynamicButtonItem = defineComponent({
  name: 'DynamicButtonItem',
  props: {
    label: { type: String as PropType<ButtonItemField['label']>, default: '' },
  },
  setup(props, { attrs, expose }) {
    expose({});
    return () => createVNode(ElButton, attrs, { default: () => props.label });
  },
});
