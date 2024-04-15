<template>
  <dynamic-button :max="3" group :options="data.options" @click="onClick"/>
</template>

<script lang="ts">export default { name: 'AppDynamicButton' };</script>
<script lang="ts" setup>
import { DynamicButton } from 'dynamic-module';
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
    { label: '按钮10', name: 'btn10' },
    { label: '按钮11', name: 'btn11' },
    { label: '按钮12', name: 'btn12' },
  ],
});

function onClick(event: Event, name?: string) {
  console.log('onClick', event, name);
}
</script>
