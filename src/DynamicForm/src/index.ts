import { cloneVNode, computed, createVNode, defineComponent, inject, onMounted, provide, renderList, shallowRef } from 'vue';
import { ElForm, ElRow, ElCol } from 'element-plus';
import { DynamicModels } from '../../DynamicModels';
import { isType, ObjectOmit } from '../../utils';
import { DynamicFormProps } from './interface';
import { useHookRefs } from '../../hooks';
import { Ref } from 'vue';

export default defineComponent({
  name: 'DynamicForm',
  props: DynamicFormProps,
  emits: ['change'],
  setup(props, { expose, emit }) {
    // values
    const values = inject<Ref<{ [key: string]: any }>>('dynamic-values', shallowRef(props.modelValue));
    provide('dynamic-values', values);
    // models
    const models = inject<Ref<{ [key: string]: any }>>('dynamic-modules', shallowRef({}));
    provide('dynamic-modules', computed(() => ({ ...models.value, ...props.modules })));
    // emits
    provide('dynamic-emits', inject('dynamic-emits', emit));
    // refs
    const { refCore, onLoadRef, onAddRefs } = useHookRefs();
    onMounted(() => onLoadRef());
    // render
    expose({});
    return () => {
      return createVNode(ElForm, { ...props.form, model: values.value, rules: props.rules, ref: refCore }, {
        default: () => {
          return createVNode(ElRow, props.row, {
            default: () => {
              const defaultNode = createVNode(DynamicModels);
              return renderList(props.children, (child, index) => {
                return createVNode(ElCol, child.col || {}, {
                  default: () => {
                    if (isType(child, 'String')) return [child];
                    return [cloneVNode(defaultNode, { ...ObjectOmit(child, ['col']), ref: onAddRefs(index, child.ref) })];
                  },
                });
              });
            },
          });
        },
      });
    };
  },
});
