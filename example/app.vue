<template>
  <dynamic-form ref="refModules" v-model="data.formValue" :fields="data.fields"/>
  <el-button @click="onClick">tagger ElFormItem</el-button>
  <dynamic-modules field="div" :children="data.children"/>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { DynamicForm, DynamicModules } from 'dynamic-module';
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
    { col: { span: 12 }, field: 'el-form-item', label: '姓名', required: true, style: { paddingLeft: '10px' }, children: [{ field: 'el-input', prop: 'form.name', label: '姓名' }] },
  ],
  children: [{
    field: 'el-table', data: [{ name: 'ReFunny', age: '18', address: '中国' }], children: [
      { field: 'el-table-column', prop: 'name', label: '姓名' },
      { field: 'el-table-column', prop: 'age', label: '年龄' },
      { field: 'el-table-column', prop: 'address', label: '地址' },
    ],
  }],
});
</script>
