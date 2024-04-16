import { App, cloneVNode, createVNode, defineComponent, PropType, renderList } from 'vue';
import { DropdownField, DynamicDropdown } from '../DynamicDropdown';
import { ButtonField, DynamicButton } from '../DynamicButton';
import './style.css';

export interface ButtonGroupField {
  max?: number; // 最大按钮数量
  group?: boolean; // 是否分组
  dropdownText?: string; // 下拉框文本
  dropdown?: DropdownField; // 下拉框配置
  options: Array<ButtonField & { name: string } | string>; // 按钮配置
}

const DynamicButtonMap = {
  success: { name: 'success', label: '成功', type: 'success' },
  warning: { name: 'warning', label: '警告', type: 'warning' },
  danger: { name: 'danger', label: '危险', type: 'danger' },
  remove: { name: 'remove', label: '删除', type: 'danger' },
  edit: { name: 'edit', label: '编辑', type: 'primary' },
  view: { name: 'view', label: '查看', type: 'primary' },
  info: { name: 'info', label: '信息', type: 'info' },
};

export const DynamicButtonGroup = defineComponent({
  name: 'DynamicButtonGroup',
  props: {
    max: { type: Number as PropType<ButtonGroupField['max']>, default: 0 },
    group: { type: Boolean as PropType<ButtonGroupField['group']>, default: false },
    options: { type: Array as PropType<ButtonGroupField['options']>, default: () => [] },
    dropdown: { type: Object as PropType<ButtonGroupField['dropdown']>, default: () => ({}) },
    dropdownText: { type: String as PropType<ButtonGroupField['dropdownText']>, default: () => '更多' },
  },
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
              const newProps = typeof item === 'string' ? (DynamicButtonMap[item] || { name: item, label: item }) : item;
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

DynamicButtonGroup.install = (app: App) => {
  app.component(DynamicButtonGroup.name, DynamicButtonGroup);
};
