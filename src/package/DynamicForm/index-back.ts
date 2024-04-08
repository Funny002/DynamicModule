import { App, defineAsyncComponent } from 'vue';

export * from './interface';

export const DynamicForm = defineAsyncComponent(() => import('./src/index.vue'));

DynamicForm.install = (app: App) => {
  app.component('DynamicForm', DynamicForm);
};
