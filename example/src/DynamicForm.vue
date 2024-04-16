<template>
  <div style="display: flex; align-items: center; line-height: 30px;">
    <div style="padding-right: 10px;">Value:</div>
    <div>{{ data.formValue }}</div>
  </div>
  <dynamic-form ref="onRef" v-model="data.formValue" :row="data.row" :children="data.children" @change="onChange"/>
</template>

<script lang="ts">export default { name: 'AppDynamicForm' };</script>
<script lang="ts" setup>
import { DynamicForm } from 'dynamic-models';
import { reactive, ref } from 'vue';

const onRef = ref();

const data = reactive({
  formValue: {},
  row: { gutter: 10 },
  children: [
    { col: { span: 7 }, field: 'el-form-item', children: { field: 'el-input', props: 'name', label: '姓名', slots: { prepend: '姓名' } } },
    { col: { span: 7 }, field: 'el-form-item', label: '年龄', children: { field: 'el-input-number', props: 'age', style: { width: '100%' } } },
    { col: { span: 7 }, field: 'el-form-item', label: '地址', children: { field: 'el-input', props: 'address' } },
    { col: { span: 3 }, field: 'el-button', children: '确定', type: 'primary', style: { width: '100%' }, onClick },
  ],
});

function onClick(event: any) {
  console.log('event', { event, onRef: onRef.value });
}

function onChange(...args: any[]) {
  console.log('onChange', args);
}
</script>
