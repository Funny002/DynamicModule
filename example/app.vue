<template>
  <div>
    <h3>App</h3>
    <div class="item-list">
      <h4>DynamicModules</h4>
      <dynamic-modules/>
    </div>
    <div class="item-list">
      <h4>DynamicForm</h4>
      <dynamic-form/>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicModules from './src/DynamicModules.vue';
import DynamicForm from './src/DynamicForm.vue';
</script>

<style>
.item-list {
  padding-left: 10px;

}

.item-list h4 {
  margin: 10px 0;
}
</style>