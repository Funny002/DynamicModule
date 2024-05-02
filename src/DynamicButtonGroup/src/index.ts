import { cloneVNode, createVNode, defineComponent, renderList } from 'vue';
import { ButtonGroupProps, DynamicButtonGroupMap } from './interface';
import { DynamicDropdown } from '../../DynamicDropdown';
import { DynamicButton } from '../../DynamicButton';
import './style.css';

export default defineComponent({
  name: 'DynamicButtonGroup',
  props: ButtonGroupProps,
  emits: ['click'],
  setup(props, { expose, emit }) {
    // 渲染
    expose({});
    const onClick = (name: string, event?: Event) => emit('click', name, event);
    const onCommand = (command: string, _: any, event: Event) => onClick(command, event);
    return () => {
      const buttonDom = createVNode(DynamicButton);
      return createVNode('div', { class: ['dynamic-button', props.group ? 'el-button-group' : ''].join(' ') }, {
        default: () => {
          const options = props.max ? props.options.slice(0, props.max) : props.options;
          const list = [
            renderList(options, (item, key) => {
              const newProps = typeof item === 'string' ? (DynamicButtonGroupMap[item] || { name: item, label: item }) : item;
              return cloneVNode(buttonDom, { ...newProps, key, onClick: (event: Event) => onClick(newProps.name, event) });
            }),
          ];
          if (props.max) {
            // @ts-ignore
            list.push(createVNode(DynamicDropdown, { ...props.dropdown, options: props.options.slice(props.max), label: props.dropdownText, onCommand }));
          }
          return list;
        },
      });
    };
  },
});
