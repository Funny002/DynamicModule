import { defineAsyncComponent } from 'vue';

export const DynamicForm = defineAsyncComponent(() => import('./src/index.vue'));
