<template>
  <dynamic-form ref="refModules" v-model="data.formValue" :fields="data.fields"/>
  <el-button @click="onClick">tagger ElFormItem</el-button>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { DynamicForm } from 'dynamic-module';
import { reactive, ref } from 'vue';

const refModules = ref();

function onClick() {
  console.log(refModules.value);
  data.fields[0]['show'] = !data.fields[0]['show'];
}

const data = reactive({
  value: '',
  formValue: { name: 'ReFunny', form: { name: 'FormName' } },
  fields: [
    { field: 'el-form-item', label: '姓名', required: true, children: [{ field: 'el-input', prop: 'form.name', label: '姓名' }] },
    { col: { span: 12 }, field: 'el-form-item', label: '姓名', required: true, children: [{ field: 'el-input', prop: 'form.name', label: '姓名' }] },
    { col: { span: 12 }, field: 'el-form-item', label: '姓名', required: true, children: [{ field: 'el-input', prop: 'form.name', label: '姓名' }] },
  ],
});
</script>
