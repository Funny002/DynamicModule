import { defineAsyncComponent } from 'vue';

export * from './interface';

export const DynamicModules = defineAsyncComponent(() => import('./src/index.vue'));

DynamicModules.install = (app: any) => {
  app.component('DynamicModules', DynamicModules);
};
