import { reactive, watchEffect } from 'vue';

// 转换为动态属性, 具备响应式
export function toDynamicAttrs(attrs: Record<string, any>, attrsKey: string[], templates?: [string, string]) {
  const dynamicTarget: Record<string, Function> = {};
  const target = reactive(Object.assign({}, attrs));
  const replace = (reg => (str: string) => reg ? str.split(reg).join('') : str)(templates ? new RegExp(`^${templates[0]}\\s*(.+)\\s*${templates[1]}$`) : null);
  for (const key of attrsKey) {
    if (!dynamicTarget[key]) {
      dynamicTarget[key] = new Function(...Object.keys(target), `return ${ replace(target[key]) }`);
    }
    // 监听属性变化
    watchEffect(() => {
      target[key] = dynamicTarget[key](...Object.values(target));
    });
  }
  // 返回
  return target;
}

