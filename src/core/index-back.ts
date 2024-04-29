// import { cloneVNode, computed, createVNode, defineComponent, inject, onMounted, renderList, resolveComponent, shallowRef } from 'vue';
// import { isType, toDynamicAttrs } from '../../utils';
// import { useHookRefs } from '../../hooks';
//
// export default defineComponent({
//   name: 'DynamicModels',
//   props: baseField,
//   setup(props, { expose, attrs }: any) {
//     const modules = inject('dynamic-modules', shallowRef({}));
//     // 无法解析会出现 Vue 警告
//     const module = computed(() => modules.value[props.field] || resolveComponent(props.field));
//     const show = computed(() => !module.value ? false : props.show);
//     const { refCore: ref, onAddRefs, onLoadRef } = useHookRefs();
//     onMounted(() => onLoadRef());
//     expose({});
//     return () => {
//       if (!show.value) return null;
//       return createVNode(module.value, { ...handleAttrs(props, attrs), ref }, handleChildren(props.slots, props.children, onAddRefs));
//     };
//   },
// });
//
// // 处理属性
// function handleAttrs({ attrs: propsAttrs, dynamicAttrs }: BaseField, attrs: Record<string, any>) {
//   let [props, propsKey] = [Object.assign({}, propsAttrs, attrs), dynamicAttrs as unknown as string[]];
//   if (!Array.isArray(dynamicAttrs)) {
//     [props, propsKey] = [Object.assign({}, propsAttrs, attrs, dynamicAttrs), Object.keys(dynamicAttrs)];
//   }
//   // 添加动态属性
//   return toDynamicAttrs(props, propsKey);
// }
//
// // 处理子节点
// function handleChildren(slots: BaseField['slots'], children: BaseField['children'], onAddRefs: Function) {
//   const newSlots: BaseField['slots'] = { ...slots, default: [].concat(children, slots['default'] || []) };
//   const childDom = createVNode(resolveComponent('DynamicModels'));
//   //
//   return Object.keys(newSlots).reduce((prev, curr) => {
//     prev[curr] = (slotData: any) => renderList(newSlots[curr], (child, key: number) => {
//       if (!isType(child, 'Object')) return child; // 不需要递归
//       return cloneVNode(childDom, { ...child, ...slotData, key, ref: onAddRefs(key, child.ref) }); // 展开 child, slotData
//     });
//     return prev;
//   }, {});
// }
