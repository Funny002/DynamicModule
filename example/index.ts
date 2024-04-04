import { ElFormItem, ElInput } from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.component(ElInput.name, ElInput);
app.component(ElFormItem.name, ElFormItem);

app.mount('#app');
