<template>
  <component :is="component" v-if="props.show" ref="refCore" v-bind="Object.assign({ prop: props.prop }, $attrs)" v-model="values">
    <template v-for="(children, key) in slots" v-slot:[key]="slotData" :key="key">
      <dynamic-models v-for="(child, index) in children" :slotData="slotData" v-bind="child" :key="`${key}-${index}`" :ref="onAddRefs(`${key}-${index}`)"/>
    </template>
    <template v-slot="slotData" v-if="(slots.default || []).length">
      <dynamic-models v-for="(item, key) in slots.default" :slotData="slotData" v-bind="item" :key="`default-${key}`" :ref="onAddRefs(`default-${key}`)"/>
    </template>
  </component>
</template>

<script lang="ts">export default { name: 'DynamicModels' };</script>
<script lang="ts" setup>
import { computed, h, inject, onMounted, ref, resolveComponent, shallowRef } from 'vue';
import { useHookRefs, useHookValue } from '../../hooks';
import { LoggerMessage } from '../../utils';
import { BaseField } from '../interface';
import { Ref } from 'vue';

const props = withDefaults(defineProps<BaseField>(), { show: () => true, children: () => [] });
const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', ref({}));
const logger = inject<LoggerMessage | Console>('logger-message', console);

const defaultType = ['div', 'span', 'p'];
const component = computed(() => models.value[props.field] || h(!defaultType.includes(props.field) ? resolveComponent(props.field) : props.field));
if (!component.value) logger.warn(`%s Failed to resolve component: %s`, 'Dynamic Modules', props.field);

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

// values
const values = useHookValue(props, inject<Ref<Record<string, any>>>('dynamic-value', shallowRef({})));

// refs - 需要在 onMounted 之后执行 onLoadRef
const { refCore, onAddRefs, onLoadRef } = useHookRefs();
onMounted(() => onLoadRef());
</script>
