<template>
  <component :is="component" v-if="isShow" ref="refCore" v-bind="$attrs" v-model="values">
    <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
    <template v-for="(item, key) in props.children" v-slot="slotData">
      <dynamic-models v-bind="item" :slot="slotData" :key="key"/>
    </template>
  </component>
</template>

<script lang="ts">export default { name: 'DynamicModels' };</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';
import { LoggerMessage } from '../../utils/logger.ts';
import { BaseField } from '../interface';
import { Ref } from 'vue';

const props = withDefaults(defineProps<BaseField>(), {
  show: () => true,
  children: () => [],
});
const logger = inject<LoggerMessage | null>('logger-message', null);
const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', ref({}));
const formValue = inject<Ref<{ [key: string]: any }>>('dynamic-value', ref({}));
const component = computed(() => models.value ? models.value[props.field] : null);
const isShow = computed(() => !component.value ? false : props.show);

if (!component.value && logger) {
  logger.warn(`%s: ${ props.field } is not found`, 'Dynamic Modules');
}

const values = computed({
  get() {
    if (!props.prop) return undefined;
    return formValue.value[props.prop];
  },
  set(value: any) {
    if (!props.prop) return undefined;
    formValue.value[props.prop] = value;
  },
});

// ref 暴露给父组件
const refCore = ref();
const instance = getCurrentInstance();

onMounted(() => {
  if (!refCore.value || !instance) return false;
  const entries = Object.entries(refCore.value.$.exposed);
  if (!instance.exposed) instance.exposed = {};
  for (const [key, value] of entries) {
    instance.exposed[key] = value;
  }
});
</script>
