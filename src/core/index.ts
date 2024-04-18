import { App, defineComponent, inject, PropType, shallowRef } from 'vue';

export interface BaseField {
  /* 标识 */
  field: string; // field 标识渲染组件
  /* 显示 */
  show?: boolean;
  /* 属性 */
  prop?: string; // 为组件 v-model 添加
  /* 静态属性 */
  attrs?: Record<string, any>;
  /* 插槽值 */
  slotData?: Record<string, any>;
  /* 动态属性 */
  dynamic?: Record<string, string>;
  /* 子节点 */
  children?: BaseField[] | BaseField | any;
  /* 插槽 */
  slots?: Record<string, BaseField['children']>;
}

export const DynamicModels = defineComponent({
  name: 'DynamicModels',
  props: {
    show: { type: Boolean as PropType<BaseField['show']>, default: () => true },
    attrs: { type: Object as PropType<BaseField['attrs']>, default: () => ({}) },
    slots: { type: Object as PropType<BaseField['slots']>, default: () => ({}) },
    prop: { type: String as PropType<BaseField['prop']>, default: () => undefined },
    slotData: { type: Object as PropType<BaseField['slotData']>, default: () => ([]) },
    dynamic: { type: [Object, Array] as PropType<BaseField['dynamic']>, default: () => ([]) },
    field: { type: String as PropType<BaseField['field']>, default: () => (''), required: true },
    children: { type: [Array, Object, String, Number] as PropType<BaseField['children']>, default: () => undefined },
  },
  setup(props, ctx: any) {
    const modules = inject('dynamic-modules', shallowRef({}));
    console.log(props);
    return () => null;
  },
});

DynamicModels.install = (app: App) => {
  app.component('DynamicModels', DynamicModels);
};

export default DynamicModels;
