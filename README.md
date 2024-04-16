## Dynamic Module

`Dynamic Module` 是一个动态组件，它可以根据传入的`JSON Schema`数据动态生成组件。

为了让其可以更好的使用，提供了一些基础类型，以及一些常用的组件。

同时为了可以让其可以扩展更多的组件或只需要部分组件，提供了简单的解决方案。

由于方便管理数据内容，将使用 `Provider/Inject` 的方式来传递数据。

## 组件

> [DynamicModules](./docs/DynamicModules.md) `核心`动态组件
>
> [DynamicForm](./docs/DynamicForm.md) 表单封装
>
> [DynamicButton](./docs/DynamicButton.md) 按钮封装
>
> [DynamicDropdown](./docs/DynamicDropdown.md) 下拉框封装
>
> [DynamicButtonGroup](./docs/DynamicButtonGroup.md) 按钮组封装
>

## 声明

> [BaseField](./docs/DynamicModules.md#声明) DynamicModules 声明
>
> [FormField](./docs/DynamicForm.md#FormField) DynamicForm 声明
>
> [FormItemField](./docs/DynamicForm.md#FormItemField) DynamicForm 声明
>
> [ButtonField](./docs/DynamicButton.md#声明) DynamicButton 声明
>
> [DropdownField](./docs/DynamicDropdown.md#声明) DynamicDropdown 声明
>
> [ButtonGroupField](./docs/DynamicButtonGroup.md#声明) DynamicButtonGroup 声明

## 更新

当前存在破坏性更新。请查看[更新日志](./CHANGELOG.md)以获取更多信息。
