import { defineAsyncComponent } from 'vue';

export * from './interface';

export const DynamicForm = defineAsyncComponent(() => import('./src/index.vue'));

DynamicForm.install = (app) => {
  app.component('DynamicForm', DynamicForm);
};
