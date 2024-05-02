import { PropType } from 'vue';

export interface DynamicModelsField {
  /* 标识 */
  field: string; // field 标识渲染组件
  /* 属性 */
  props?: string; // 为组件 v-model 添加
  /* 显示 */
  show?: boolean;
  /* 插槽 */
  slots?: Record<string, DynamicModelsField['children']>;
  /* 子节点 */
  children?: DynamicModelsField[] | DynamicModelsField | any;
}

export const DynamicModelsProps = {
  show: { type: Boolean as PropType<DynamicModelsField['show']>, default: () => true },
  slots: { type: Object as PropType<DynamicModelsField['slots']>, default: () => ({}) },
  props: { type: String as PropType<DynamicModelsField['props']>, default: () => undefined },
  field: { type: String as PropType<DynamicModelsField['field']>, default: () => (''), required: true },
  children: { type: [Array, Object, String] as PropType<DynamicModelsField['children']>, default: () => [] },
};
