<template>
  <div style="display: flex;">
    <dynamic-button-group :max="5" group :options="data.options" @click="onClick"/>
    <dynamic-button-group style="margin-left: 100px" group :options="data.options" @click="onClick"/>
  </div>
  <div style="display: flex; margin-top: 20px">
    <dynamic-button-group :max="4" :options="data.options" @click="onClick"/>
    <dynamic-button-group style="margin-left: 100px" :options="data.options" @click="onClick"/>
  </div>
</template>

<script lang="ts">export default { name: 'AppDynamicButton' };</script>
<script lang="ts" setup>
import { DynamicButtonGroup } from '../../src';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const data = reactive({
  options: [
    { label: '按钮1', name: 'btn1' },
    { label: '按钮2', name: 'btn2' },
    { label: '按钮3', name: 'btn3' },
    { label: '按钮4', name: 'btn4' },
    { label: '按钮5', name: 'btn5' },
    { label: '按钮6', name: 'btn6' },
    { label: '按钮7', name: 'btn7' },
    { label: '按钮8', name: 'btn8' },
    { label: '按钮9', name: 'btn9' },
  ],
});

function onClick(name: string) {
  const item = data.options.find((item) => item.name === name);
  ElMessage.success(`点击了${ item?.label }`);
}
</script>
