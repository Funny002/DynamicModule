import { App } from 'vue';

import component from './src/index';

component.install = function (Vue: App) {
  Vue.component(component.name, component);
};

export const DynamicModels = component;

export type { DynamicModelsField } from './src/interface';
