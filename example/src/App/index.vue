<template>
  <div>App</div>
  <dynamic-form :fields="data.fields"/>
  {{ data.value }}
  <dynamic-modules name="input" v-model="data.value" type="password" ref="refInput">
    <template #prepend>Http://</template>
  </dynamic-modules>
  <button @click="onClick">x</button>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { DynamicForm, DynamicModules } from 'dynamic-module';
import { onMounted, provide, reactive, ref } from 'vue';
import 'element-plus/theme-chalk/el-input.css';
import { ElInput } from 'element-plus';
import { LoggerMessage } from 'dynamic-module/utils/logger.ts';

provide('dynamic-modules', {
  // input: ElInput,
});

provide('logger-message', new LoggerMessage('App'));

const refInput = ref();

function onClick() {
  refInput.value?.focus();
}

const data = reactive({
  value: '',
  fields: [
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'name', label: '姓名' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'age', label: '年龄' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'sex', label: '性别' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'address', label: '地址' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'phone', label: '电话' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'email', label: '邮箱' },
    { col: { span: 12 }, field: 'input', type: 'password', prop: 'qq', label: 'QQ' },
  ],
});
</script>
