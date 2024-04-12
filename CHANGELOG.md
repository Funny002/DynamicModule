## 2024-04-12

- 修改 `DynamicForm` 模块
- 将动态组件内 `Array.map` 方法改为 `vue` 提供的 `renderList` 方法，希望可以优化渲染性能。
- 版本更新到 `0.0.6`

## 2024-04-07

- 添加 `Github` 信息到 `package.json`
- 修正需要上传到 `npm` 的文件
- 版本更新到 `0.0.5`

## 2024-04-06

- 修正 `useHookRefs` onLoadRef 方法的错误。
- 修正 `DynamicModules` 默认插槽（`v-slot:default`）丢失问题。
- 修正 `DynamicModules` 在加载部分 `element-plus` 组件时缺少 `prop` 参数的问题。
- 版本更新到 `0.0.4`

## 2024-04-05

- 将部分代码抽离成 mixin hooks `useHookRefs` `useHookValue`。
- 为 `DynamicModules` 添加 `解析组件名` 功能，让其支持动态组件名。
- 添加 `DynamicForm` 组件，将多个组件封装在一起，以便更好的使用。
- 版本更新到 `0.0.3`

## 2024-04-04

- 确定核心组件模块名称为 `DynamicModules` 声明为 `BaseField`。
- 初步确定`DynamicModules`的功能和使用场景，并实现基本功能.
- 版本更新到 `0.0.2`

## 2024-04-01

- 版本更新到 `0.0.1`
- 初始化项目.
