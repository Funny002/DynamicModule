<template>
  <el-form v-if="props.show" ref="refCore" v-bind="ObjectOmit(props.form as Record<string, any>,['model', 'rules'])" :model="value" :rules="props.rules">
    <el-row v-bind="props.row" :ref="onAddRefs('row')">
      <template v-for="alias in ['fields', 'children']" :key="alias">
        <el-col v-for="(child, key) in props[alias]" :key="`${alias}-${key}`" v-bind="child.col" :ref="onAddRefs(`${alias}-${key}-col`)">
          <dynamic-modules v-bind="ObjectOmit(child,['col'])" :ref="onAddRefs(`${alias}-${key}`)"/>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm' };</script>
<script lang="ts" setup>
import { computed, inject, onMounted, provide, shallowRef } from 'vue';
import { BaseField, DynamicModules } from '../../../index';
import { useHookRefs, useHookValue } from '../../../hooks';
import { ObjectOmit } from '../../../utils';
import { FormField } from '../interface';
import { Ref } from 'vue';

const props = withDefaults(defineProps<FormField>(), {
  show: true,
  form: () => ({}),
  fields: () => [],
  children: () => [],
  modules: () => ({}),
});

// 奇怪的传递 - value
const dynamic_value = inject<Ref<Record<string, any> | undefined>>('dynamic-value', shallowRef(props.modelValue));
const value = useHookValue(props as unknown as BaseField, dynamic_value);
provide('dynamic-value', computed(() => value.value));

// 奇怪的传递 - modules
const dynamic_modules = inject<Ref<Record<string, any>>>('dynamic-modules', shallowRef({}));
provide('dynamic-modules', computed(() => Object.assign({}, dynamic_modules.value, props.modules)));

// refs
const { refCore, onAddRefs, onLoadRef } = useHookRefs();
onMounted(() => onLoadRef());
</script>
