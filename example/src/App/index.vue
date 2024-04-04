<template>
  <div>App</div>
  {{ data }}
  <dynamic-form ref="refModules" v-model="data.formValue" :fields="data.fields" :modules="modules"/>
  <button @click="onClick">onClick</button>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { DynamicForm } from 'dynamic-module';
import { ElFormItem, ElInput } from 'element-plus';
import { provide } from 'vue';

const refModules = ref();

function onClick() {
  console.log(refModules.value);
  data.fields[0].children[0].show = !data.fields[0].children[0].show;
}

const modules = {
  'input': ElInput,
  'form-item': ElFormItem,
};

const data = reactive({
  value: '',
  formValue: { name: 'ReFunny', form: { name: 'FormName' } },
  fields: [
    {
      col: { span: 12 },
      field: 'form-item',
      label: '姓名',
      required: true,
      children: [
        { field: 'input', prop: 'form.name' },
      ],
    },
  ],
});

provide('dynamic-values', computed(() => data.formValue));
</script>
