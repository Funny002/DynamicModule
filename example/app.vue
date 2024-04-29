<template>
  <div>
    <h3>App</h3> {{ attrs }}
    <dynamic-models ref="onRef" field="div" :children="data.children"/>
    <dynamic-models field="button" children="按钮" @click="onClick"/>
  </div>
</template>

<script setup lang="ts">
import { DynamicModels, utils } from 'dynamic-models';
import { reactive, ref, toRefs } from 'vue';

const onRef = ref();

const attrs = utils.toDynamicAttrs({
  a: 1,
  b: 2,
  c: 'a + b',
  style: 'c + 1 >= 20 ? {display: \'none\'} : \'\'',
}, ['style', 'c']);

const data = reactive({
  children: [
    { field: 'div', children: 'App1' },
    { field: 'div', children: 'App2', ref: 'App2', attrs },
  ],
});

function onClick() {
  attrs.a++;
}
</script>
