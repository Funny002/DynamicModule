import { App, createVNode, defineComponent } from 'vue';
import { ButtonProps, ElButton } from 'element-plus';

export interface ButtonField extends ButtonProps {
  label: string; // 按钮文字
}

export const DynamicButton = defineComponent({
  name: 'DynamicButton',
  props: {
    label: { type: String, default: '' },
  },
  setup(props, { attrs, expose }) {
    expose({});
    return () => createVNode(ElButton, attrs, { default: () => props.label });
  },
});

DynamicButton.install = (app: App) => {
  app.component(DynamicButton.name, DynamicButton);
};
