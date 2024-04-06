import { getCurrentInstance, ref } from 'vue';

export function useHookRefs() {
  const refCore = ref();
  const instance = getCurrentInstance();

  function onLoadRef() {
    if (!refCore.value || !instance) return;
    if (!instance.exposed) instance.exposed = {};
    if (!refCore.value.$) {
      instance.exposed['$el'] = refCore.value;
      Object.defineProperty(instance.exposed, '$el', { enumerable: false });
    } else if (refCore.value.$.exposed) {
      const entries = Object.entries(refCore.value.$.exposed);
      for (const [key, value] of entries) {
        instance.exposed[key] = value;
      }
    }
  }

  function onAddRefs(key: string) {
    return function (ref: any) {
      if (!refCore.value || !instance) return;
      if (!instance.exposed) instance.exposed = {};
      if (!instance.exposed.childRefs) instance.exposed.childRefs = {};
      instance.exposed.childRefs[key] = ref;
    };
  }

  return { refCore, onAddRefs, onLoadRef };
}
