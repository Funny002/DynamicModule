## DynamicButtonGroup

> `DynamicButtonGroup` 是 `DynamicButton`,`DynamicDropdown` 的组合组件，可以实现按钮在一定数量下将其余的按钮折叠起来。

## 声明

声明中包含其他声明，如下：

- [ButtonField](./DynamicButton.md#声明) 基础类型声明
- [DropdownField](./DynamicDropdown.md#声明) 基础类型声明

```typescript
export interface ButtonGroupField {
  max?: number; // 最大按钮数量
  group?: boolean; // 是否分组
  dropdownText?: string; // 下拉框文本
  dropdown?: DropdownField; // 下拉框配置
  options: Array<ButtonField & { name: string } | string>; // 按钮配置
}
```

### 示例

[DynamicButton](../example/src/DynamicButton.vue)
