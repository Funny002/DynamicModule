<template>
  <div>
    <h3>App</h3>
    <dynamic-models ref="onRef" field="div" :children="data.children"/>
    <dynamic-models field="button" children="按钮" @click="onClick"/>
  </div>
</template>

<script setup lang="ts">
import { DynamicModels } from '../src';
import { reactive, ref } from 'vue';

const onRef = ref();
const data = reactive({
  children: [
    { field: 'div', children: 'App1' },
    { field: 'div', children: 'App2', ref: 'App2' },
  ],
});

function onClick() {
  console.log(onRef);
}
</script>
