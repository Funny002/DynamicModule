## DynamicForm

> `DynamicForm` 是一个动态表单组件，它可以根据传入的`JSON Schema`数据动态生成表单。
>
> 它是 `DynamicModules` 的一个扩展，将多个组件封装在一起，以便更好的使用。

## 声明

声明中包含其他声明，如下：

- [BaseField](./DynamicModules.md#声明) 基础类型声明
- [FormProps](https://element-plus.org/zh-CN/component/form.html#form-attributes) Element-Plus 表单属性
- [RowProps](https://element-plus.org/zh-CN/component/layout.html#row-attributes) Element-Plus 行属性
- [ColProps](https://element-plus.org/zh-CN/component/layout.html#col-attributes) Element-Plus 列属性

### FormField

```typescript
interface FormField extends Omit<BaseField, 'field' | 'slots'> {
  row?: RowProps; // 行属性
  modules?: Record<string, any>; // 附加组件
  modelValue?: Record<string, any>; // 表单数据
  children?: (FormItemField | any)[]; // 子内容
  form?: Partial<Omit<FormProps, 'model' | 'rules'>>; // 表单属性
  rules?: Record<string, Array<Record<string, any>>>; // 表单验证
}
```

### FormItemField

```typescript
type FormItemField = BaseField & { col?: ColProps; };
```

### 示例

[DynamicForm](../example/src/DynamicForm.vue)
