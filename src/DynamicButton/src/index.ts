import { createVNode, defineComponent } from 'vue';
import { DynamicButtonProps } from './interface';
import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'DynamicButton',
  props: DynamicButtonProps,
  setup(props, { attrs, expose }) {
    expose({});
    return () => createVNode(ElButton, attrs, { default: () => props.label });
  },
});
