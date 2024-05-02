import Component from './src/index';
import { App } from 'vue';

export const DynamicButtonGroup = Component;
DynamicButtonGroup.install = (app: App) => {
  app.component(DynamicButtonGroup.name, DynamicButtonGroup);
};
