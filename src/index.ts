import { defineAsyncComponent } from 'vue';

export const DynamicModules = defineAsyncComponent(() => import('./core/dynamic.vue'));

export const DynamicForm = defineAsyncComponent(() => import('./DynamicForm/index.vue'));
