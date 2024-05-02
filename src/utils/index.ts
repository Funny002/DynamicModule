import { App } from 'vue';

export * from './limit';

export * from './logger';

export * from './object';

export * from './dynamicAttrs';

export const warnInstall = (component: Record<string, any>, name?: string) => {
  if (!component.install) {
    component.install = function (app: App) {
      app.component(name || component.name, component);
    };
  }
  return component;
};
