<template>
  <div>
    <h3>App</h3>
    <dynamic-models ref="onRef" field="div"/>
    <dynamic-models field="button" children="按钮" @click="onClick"/>
  </div>
</template>

<script setup lang="ts">
import DynamicModels from 'dynamic-models/core';
import { ref } from 'vue';

const onRef = ref();

function onClick() {
  console.log(onRef.value);
}
</script>
