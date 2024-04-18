import { App, defineComponent } from 'vue';

export interface BaseField {
  /* 标识 */
  field: string; // field 标识渲染组件
  /* 显示 */
  show: boolean;
  /* 属性 */
  prop?: string; // 为组件 v-model 添加
  /* 静态属性 */
  attrs: Record<string, any>;
  /* 插槽值 */
  slotData: Record<string, any>;
  /* 动态属性 */
  dynamic: Record<string, string>;
  /* 子节点 */
  children: BaseField[] | BaseField | any;
  /* 插槽 */
  slots: Record<string, BaseField['children']>;
}

export const DynamicModels = defineComponent({
  name: 'DynamicModels',
  props: {},
  setup(props, { attrs, expose }: any) {
    //
  },
});

DynamicModels.install = (app: App) => {
  app.component('DynamicModels', DynamicModels);
};

export default DynamicModels;
