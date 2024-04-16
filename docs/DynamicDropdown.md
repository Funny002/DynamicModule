## DynamicDropdown

> `DynamicDropdown` 下拉框组件，在原来的 `Dropdown` 基础上取消插槽，使用 `label` 和 `options` 替代。

## 声明

声明中包含其他声明，如下：

- [ButtonProps](https://element-plus.org/zh-CN/component/button.html#button-api) Element-Plus 属性

```typescript
export interface DropdownField {
  label?: string; // 文本
  button?: ButtonProps; // 按钮属性
  options: { name: string; label: string; icon?: any; disabled?: boolean; divided?: boolean }[]; // 下拉框选项
}
```

### 示例

[DynamicButton](../example/src/DynamicButton.vue)
