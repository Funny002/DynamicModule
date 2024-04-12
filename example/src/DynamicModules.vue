<template>
  <dynamic-modules ref="onRef" :children="data.fields" field="div"/>
</template>

<script lang="ts">export default { name: 'AppDynamicModules' };</script>
<script lang="ts" setup>
import { DynamicModules } from 'dynamic-module';
import { provide, reactive, ref } from 'vue';

const onRef = ref();

const formValue = ref([{ name: 'ReFunny', age: 18, address: '中国' }]);

const data = reactive({
  fields: [{
    field: 'el-form',
    children: [
      { field: 'el-form-item', label: '姓名', required: true, children: { field: 'el-input', props: '0.name', label: '姓名', slots: { prepend: '姓名' } } },
      { field: 'el-form-item', label: '年龄', required: true, children: { field: 'el-input-number', props: '0.age' } },
      { field: 'el-form-item', label: '地址', children: [{ field: 'el-input', props: '0.address', type: 'textarea' }] },
    ],
  }, {
    border: true,
    field: 'el-table',
    data: formValue.value,
    children: [
      { field: 'el-table-column', prop: 'name', label: '姓名' },
      { field: 'el-table-column', prop: 'age', label: '年龄' },
      { field: 'el-table-column', prop: 'address', label: '地址' },
    ],
  }],
});

provide('dynamic-values', formValue);
</script>
