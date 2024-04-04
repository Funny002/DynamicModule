<template>
  <component :is="component" v-if="isShow" ref="refCore" v-bind="$attrs" v-model="values">
    <template v-for="(children, key) in slots" v-slot:[key]="slotData" :key="key">
      <dynamic-models v-for="(child, index) in children" :slotData="slotData" v-bind="child" :key="`${key}-${index}`" :ref="onLoadRef(`${key}-${index}`)"/>
    </template>
    <template v-slot="slotData">
      <dynamic-models v-for="(item, key) in slots.default" :slotData="slotData" v-bind="item" :key="`default-${key}`" :ref="onLoadRef(`default-${key}`)"/>
    </template>
  </component>
</template>

<script lang="ts">export default { name: 'DynamicModels' };</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';
import { LoggerMessage } from '../../utils';
import { BaseField } from '../interface';
import { Ref } from 'vue';

const props = withDefaults(defineProps<BaseField>(), { show: () => true, children: () => [] });
const formValue = inject<Ref<{ [key: string]: any }>>('dynamic-value', ref({}));
const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', ref({}));
const emits = inject<Function>('dynamic-modules', () => {});
//
const component = computed(() => models.value ? models.value[props.field] : null);
const logger = inject<LoggerMessage | Console>('logger-message', console);
const isShow = computed(() => !component.value ? false : props.show);
//
if (!component.value) logger.warn(`%s: ${ props.field } is not found`, 'Dynamic Modules');
//
const slots = computed(() => {
  const target = props.slots || {};
  if (props.children.length) {
    if (!target.default) target.default = [];
    target.default.unshift(...props.children);
  }
  // default 不显示枚举
  Object.defineProperty(target, 'default', { enumerable: false });
  return target;
});

function handlerValue(type: 'get' | 'set') {
  if (!props.prop) return () => {};
  const propList = props.prop.split('.');
  const fieldProp = propList.pop() as string;
  const targetValue = propList.reduce((prev, curr) => {
    if (!prev.hasOwnProperty(curr)) {
      if (/^\d+$/.test(curr)) {
        prev[curr] = [];
      } else {
        prev[curr] = {};
      }
    }
    return prev[curr];
  }, formValue.value);
  // get
  if (type === 'get') return () => targetValue[fieldProp];
  // set
  return function (value: any) {
    targetValue[fieldProp] = value;
    emits('change', props.prop, value);
  };
}

const values = computed({ get: handlerValue('get'), set: handlerValue('set') });

// ref 暴露给父组件
const refCore = ref();
const instance = getCurrentInstance();

// 扩展子级 ref
function onLoadRef(key: string) {
  return function (ref: any) {
    if (!refCore.value || !instance) return;
    if (!instance.exposed) instance.exposed = {};
    if (!instance.exposed.childRefs) instance.exposed.childRefs = {};
    instance.exposed.childRefs[key] = ref;
  };
}

onMounted(() => {
  if (!refCore.value || !instance) return;
  if (!instance.exposed) instance.exposed = {};
  const entries = Object.entries(refCore.value.$.exposed);
  for (const [key, value] of entries) {
    instance.exposed[key] = value;
  }
});
</script>
