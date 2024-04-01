<template>
  <el-form v-bind="{ model: props.modelValue, ...(props.form || {}) }">
    <el-row v-bind="{ ...(props.row || {}) }">
      <el-col v-for="(fields, key) in props.fields" :key="key" v-bind="{ ...fields.col || {} }">
        <dynamic-modules v-bind="fields"/>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm' };</script>

<script lang="ts" setup>
import { computed, inject, provide, Ref, shallowRef } from 'vue';
import { RowProps } from 'element-plus/lib/components';
import { ElementForm, Field } from '../interface';
import { DynamicModules } from '../../../index';
import { ElInput } from 'element-plus';

interface Props {
  // 表单
  fields: Field[];
  // 行属性
  row?: Partial<RowProps>;
  // 表单属性
  form?: Partial<ElementForm>;
  // 附加模组
  modules?: { [key: string]: any };
  // 内容
  modelValue?: { [key: string]: any };
}

const props = withDefaults(defineProps<Props>(), { fields: () => [] });

const defaultModules = { 'input': ElInput };

// 奇怪的传递
const dynamic_modules = inject<Ref<Record<string, any>>>('dynamic-modules', shallowRef(defaultModules));
const dynamic_value = inject<Ref<Record<string, any> | undefined>>('dynamic-value', shallowRef(props.modelValue));
provide('dynamic-value', computed(() => dynamic_value.value));
provide('dynamic-modules', computed(() => Object.assign({}, dynamic_modules.value, props.modules || {})));
</script>
