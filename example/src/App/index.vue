<template>
  <div>App</div>
  {{ data.formValue }}
  <dynamic-form ref="refModules" v-model="data.formValue" :fields="data.fields" :modules="modules"/>
  <button @click="onClick">onClick</button>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DynamicForm } from 'dynamic-module';
import { ElFormItem } from 'element-plus';

const refModules = ref();

function onClick() {
  console.log(refModules.value);
}

const modules = {
  'form-item': ElFormItem,
};

const data = reactive({
  value: '',
  formValue: { name: 'ReFunny' },
  fields: [
    {
      col: { span: 12 },
      field: 'form-item',
      label: '姓名',
      required: true,
      children: [
        { field: 'input', type: 'password', prop: 'name' },
      ],
    },
  ],
});
</script>
