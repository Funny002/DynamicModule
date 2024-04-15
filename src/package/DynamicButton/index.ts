import { App, cloneVNode, createVNode, defineComponent, PropType, renderList } from 'vue';
import { DynamicDropdown } from './src/dropdown';
import { DynamicButtonItem } from './src/item';
import { ButtonProps } from 'element-plus';
import './src/style.css';

export interface ButtonField {
  max?: number;
  group?: boolean;
  options: Array<ButtonItemField | string>;
}

export interface ButtonItemField extends ButtonProps {
  name: string;
  label: string;
}

const DynamicButtonMap = {};

export const DynamicButton = defineComponent({
  name: 'DynamicButton',
  props: {
    max: { type: Number as PropType<ButtonField['max']>, default: 0 },
    group: { type: Boolean as PropType<ButtonField['group']>, default: false },
    options: { type: Array as PropType<ButtonField['options']>, default: () => [] },
  },
  emits: ['click'],
  setup(props, { expose, emit }) {
    // 渲染
    expose({});
    const onClick = (name: string, event?: Event) => emit('click', name, event);
    const onCommand = (command: string, _: any, event: Event) => onClick(command, event);
    return () => {
      const buttonDom = createVNode(DynamicButtonItem);
      return createVNode('div', { class: ['dynamic-button', props.group ? 'el-button-group' : ''].join(' ') }, {
        default: () => {
          const options = props.max ? props.options.slice(0, props.max) : props.options;
          const list = [
            renderList(options, (item, key) => {
              const newProps = typeof item === 'string' ? (DynamicButtonMap[item] || { name: item, label: item }) : item;
              return cloneVNode(buttonDom, { ...newProps, key, onClick: (event: Event) => onClick(newProps.name, event) });
            }),
          ];
          if (props.max) {
            // @ts-ignore
            list.push(createVNode(DynamicDropdown, { options: props.options.slice(props.max), label: '更多', onCommand }));
          }
          return list;
        },
      });
    };
  },
});

DynamicButton.install = (app: App) => {
  app.component(DynamicButton.name, DynamicButton);
};
