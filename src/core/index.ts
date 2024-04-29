import { defineComponent, PropType } from 'vue';

export interface PropsField {
  /* 标识 */
  field: string; // field 标识渲染组件
  /* 属性 */
  prop?: string; // 为组件 v-model 添加
  /* 显示 */
  show?: boolean;
  /* 静态属性 */
  attrs?: Record<string, any>;
  /* 动态属性 */
  dynamicAttrs?: Record<string, string>;
  /* 子节点 */
  children?: PropsField[] | PropsField | any;
  /* 插槽 */
  slots?: Record<string, PropsField['children']>;
}

export const props = {
  show: { type: Boolean as PropType<PropsField['show']>, default: () => true },
  attrs: { type: Object as PropType<PropsField['attrs']>, default: () => ({}) },
  slots: { type: Object as PropType<PropsField['slots']>, default: () => ({}) },
  prop: { type: String as PropType<PropsField['prop']>, default: () => undefined },
  field: { type: String as PropType<PropsField['field']>, default: () => (''), required: true },
  children: { type: [Array, Object, String] as PropType<PropsField['children']>, default: () => [] },
  dynamicAttrs: { type: [Object, Array] as PropType<PropsField['dynamicAttrs']>, default: () => ([]) },
};


export const DynamicModels = defineComponent({
  props,
  name: 'DynamicModels',
  setup(props, ctx) {
    return null;
  },
});
