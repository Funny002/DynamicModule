import { computed, inject, Ref } from 'vue';

export function useHookValue(props: string, value: Ref<Record<string, any>>) {
  if (!props) return { value: undefined };

  const emits = inject<Function>('dynamic-emits', null);

  function handlerValue(type: 'get' | 'set') {
    if (!props) return () => {};
    const propList = props.split('.');
    const fieldProp = propList.pop() as string;
    const targetValue = propList.reduce((prev, curr) => {
      if (!prev.hasOwnProperty(curr)) {
        if (/^\d+$/.test(curr)) {
          prev[curr] = [];
        } else {
          prev[curr] = {};
        }
      }
      return prev[curr];
    }, value.value);
    // get
    if (type === 'get') return () => targetValue[fieldProp];
    // set
    return function (value: any) {
      targetValue[fieldProp] = value;
      emits && emits('change', props, value);
    };
  }

  return computed({ get: handlerValue('get'), set: handlerValue('set') });
}
