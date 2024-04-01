<template>
  <component v-if="isShow" :is="componentModule" ref="refInput" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </component>
</template>

<script lang="ts">export default { name: 'DynamicModules' };</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';
import { LoggerMessage } from '../utils/logger';

const logger = inject<LoggerMessage>('logger-message', null);
const models = inject<{ [key: string]: any }>('dynamic-modules', {});

type Props = { name: string; show?: boolean }
const props = withDefaults(defineProps<Props>(), { show: () => true });

const componentModule = models[props.name];
const isShow = computed(() => componentModule ? props.show : false);
if (!componentModule && logger) logger.warn(`%s: ${ props.name } is not found`, 'Dynamic Modules');

// ref 暴露给父组件
const refInput = ref();
const instance = getCurrentInstance();
onMounted(() => {
  if (!refInput.value) return false;
  const entries = Object.entries(refInput.value.$.exposed);
  for (const [key, value] of entries) {
    instance.exposed[key] = value;
  }
});
</script>
