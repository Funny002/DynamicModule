## DynamicModules

> `DynamicModules` 是核心组件，用于渲染动态组件。
>
> 为其提供一个 `modules` 数据，它将根据 `modules` 中的数据渲染组件。
>
> 直接使用 DynamicModules 场景并不多，更多的是在其他组件中使用。

### 声明

```typescript
interface BaseField {
  id?: string; // 唯一标识暂无用处
  field: string; // 组件名称
  prop?: string; // 绑定的数据字段
  show?: boolean; // 是否显示组件
  children?: (BaseField | any)[]; // 子组件
  slots?: Record<string, (BaseField | any)[]>; // 插槽
}
```
