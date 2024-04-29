<template>
  <div>
    <h3>App</h3>
    {{ store }}
    <dynamic-models ref="onRef" field="div" :children="data.children"/>
    <dynamic-models field="button" children="按钮" @click="onClick"/>
  </div>
</template>

<script setup lang="ts">
import { DynamicModels } from 'dynamic-models';
import { reactive, ref, toRefs } from 'vue';

const onRef = ref();
const store = reactive({
  a: 1,
  b: 2,
});
const data = reactive({
  children: [
    { field: 'div', children: 'App1' },
    { field: 'div', children: 'App2', ref: 'App2', attrs: { style: 'a + b >= 20 ? {display: \'none\'} : \'\'', ...toRefs(store) }, dynamicAttrs: ['style'] },
  ],
});

function onClick() {
  store.a++;
  console.log(onRef.value);
}
</script>
