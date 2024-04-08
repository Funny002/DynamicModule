<template>
  <dynamic-modules ref="onRef_1" :children="data.fields" field="div"/>
  <dynamic-modules ref="onRef_2" v-bind="data.fields[0]"/>
</template>

<script lang="ts">export default { name: 'App' };</script>
<script lang="ts" setup>
import { DynamicModules } from 'dynamic-module';
import { computed, provide, reactive, ref } from 'vue';

const onRef_1 = ref();
const onRef_2 = ref();

const data = reactive({
  value: '',
  formValue: { name: 'ReFunny', form: { name: 'FormName' } },
  fields: [{
    field: 'el-form',
    children: [
      {
        field: 'el-form-item', label: '姓名', required: true, children: [
          {
            field: 'el-input', props: 'form.name', label: '姓名', slots: {
              prepend: 'http://',
            },
          },
        ],
      },
    ],
  }, {
    field: 'el-table', data: [{ name: 'ReFunny', age: '18', address: '中国' }], children: [
      { field: 'el-table-column', prop: 'name', label: '姓名' },
      { field: 'el-table-column', prop: 'age', label: '年龄' },
      { field: 'el-table-column', prop: 'address', label: '地址' },
    ],
  }, { field: 'div', children: 'Test' }],
});

provide('dynamic-values', computed(() => data.formValue));
</script>
