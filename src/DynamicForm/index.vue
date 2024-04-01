<template>
  <el-form>
    <el-row>
      <template v-for="(field, key) in props.fields" :key="key">
        <el-col v-bind="getColBind(field)">
          <el-form-item v-bind="getFormItemBind(field)">
            value{{ field }}{{ key }}
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm' };</script>

<script lang="ts" setup>
import { FormProps, RowProps } from 'element-plus/lib/components';
import { Field } from './interface.ts';

interface Props {
  fields: Field[];
  row?: RowProps;
  form?: FormProps;
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => [],
  row: () => ({}),
});

function getColBind(field: Field) {
  return field.col || {};
}

function getFormItemBind(field: Field) {
  // prop,label,labelWidth,required,rules,error,showMessage,inlineMessage,size,validateStatus
  console.log(field);
  return field.formItem || {};
}
</script>
