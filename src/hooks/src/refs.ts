import { getCurrentInstance, ref } from 'vue';
import { isType } from '../../utils';

export function useHookRefs() {
  const refCore = ref();
  const instance = getCurrentInstance();

  function onLoadRef() {
    if (!refCore.value || !instance) return;
    if (!instance.exposed) instance.exposed = {};
    if (!refCore.value.$) {
      instance.exposed['$refs'] = [];
      instance.exposed.instance = instance;
      instance.exposed['$ref'] = refCore.value;
      instance.exposed['parent'] = instance.parent?.exposed;
      Object.defineProperty(instance.exposed, '$ref', { enumerable: false });
      Object.defineProperty(instance.exposed, '$refs', { enumerable: false });
      Object.defineProperty(instance.exposed, 'parent', { enumerable: false });
      Object.defineProperty(instance.exposed, 'instance', { enumerable: false });
    } else if (refCore.value.$.exposed) {
      const entries = Object.entries(refCore.value.$.exposed);
      for (const [key, value] of entries) {
        instance.exposed[key] = value;
      }
    }
  }

  function onAddRefs(index: number, refs?: any) {
    return function (ref: any) {
      if (!refCore.value || !instance) return;
      if (!instance.exposed) instance.exposed = {};
      if (!instance.exposed['$refs']) instance.exposed['$refs'] = [];
      instance.exposed['$refs'][index] = ref;
      if (!refs) return;
      if (isType(refs, 'string')) {
        instance.exposed[refs] = ref;
      } else if (isType(refs, 'function')) {
        refs(ref);
      } else {
        refs = ref;
      }
    };
  }

  return { instance, refCore, onAddRefs, onLoadRef };
}
