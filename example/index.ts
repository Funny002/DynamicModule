import * as ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
//
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
