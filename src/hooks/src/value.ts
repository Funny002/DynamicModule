import { computed, inject, Ref } from 'vue';
import { BaseField } from '../../core';

export function useHookValue(props: BaseField, value: Ref<Record<string, any>>) {
  if (!props.prop) return value;

  const emits = inject<Function>('dynamic-modules', null);

  function handlerValue(type: 'get' | 'set') {
    if (!props.prop) return () => {};
    const propList = props.prop.split('.');
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
      emits && emits('change', props.prop, value);
    };
  }

  return computed({ get: handlerValue('get'), set: handlerValue('set') });
}
