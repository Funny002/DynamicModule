import { App, defineComponent } from 'vue';

export interface BaseField {

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
