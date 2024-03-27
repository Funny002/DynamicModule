import { ElCol, ElRow, ElForm, ElFormItem } from 'element-plus';
import { defineComponent, h } from 'vue';

interface Props {

}

export default defineComponent({
  name: 'DynamicForm',
  props: {},
  emits: {},
  extends: {},
  setup(props: Props, ctx) {
    return () => h(ElForm, {}, {
      default: () => {
        return h(ElRow, {}, {
          default: () => {
            return [].map((item, index) => {
              return h(ElCol, {}, {
                default: () => {
                  return h(ElFormItem, {}, {
                    default: () => {
                      // return h();
                      return h('div', {}, 'value');
                    },
                  });
                },
              });
            });
          },
        });
      },
    });
  },
});
