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
    <div class="item-list">
      <h4>DynamicButton</h4>
      <dynamic-button/>
    </div>
    <el-button-group>
      <el-button>按钮1</el-button>
      <el-dropdown>
        <el-button>下拉菜单</el-button>
        <template #dropdown>
          <el-dropdown-item>按钮2</el-dropdown-item>
        </template>
      </el-dropdown>
    </el-button-group>
  </div>
</template>

<script setup lang="ts">
import DynamicModules from './src/DynamicModules.vue';
import DynamicButton from './src/DynamicButton.vue';
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
