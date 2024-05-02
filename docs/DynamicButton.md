## DynamicButton

> `DynamicButton` 按钮组件，在 `el-button` 原有的基础上取消了 `default` 插槽，只支持 `label` 属性。

## 声明

声明中包含其他声明，如下：

- [ButtonProps](https://element-plus.org/zh-CN/component/button.html#button-api) Element-Plus 属性

```typescript
export interface ButtonField extends ButtonProps {
  label: string;  // 按钮文字
}
```

### 示例

[DynamicButton](../example/src/DynamicButton.vue)
