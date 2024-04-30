import { isType, ObjectSeparation } from './object';

function getRegExp(template?: string[]) {
  template = template || [''];
  template[1] = template[1] || '';
  return new RegExp(`^${  template[0] }\\s*(.+)\\s*${ template[1]  }$`);
}

function getReplace(templates?: string[]) {
  const reg = templates ? getRegExp(templates) : null;
  return (str: string) => reg ? str.split(reg).join('') : str;
}

export function DynamicAttrsByScript(script: string, attrs: Record<string, any>, templates?: string[]) {
  return (new Function(...Object.keys(attrs), `return ${ getReplace(templates)(script) }`))(...Object.values(attrs));
}

export function DynamicAttrsByObject(target: Record<string | number, string>, attrs: Record<string, any>, templates?: string[]) {
  const replace = getReplace(templates);

  function dynamicAttrsByScript(script: string) {
    return (new Function(...Object.keys(attrs), `return ${ replace(script) }`))(...Object.values(attrs));
  }

  if (Array.isArray(target)) return target.map(script => dynamicAttrsByScript(script));
  if (isType(target, 'object')) return Object.entries(target).reduce((prev, [key, script]) => {
    return Object.assign(prev, { [key]: dynamicAttrsByScript(script) });
  }, {});

  throw new Error('DynamicAttrsByObject: target must be an object or array');
}

export function toDynamicAttrs(target: Record<string, any>, templates?: string[]): Record<string, any> {
  const reg = getRegExp(templates);
  const attrsKeys = Object.keys(target).filter(key => isType(target[key], 'string') && reg.test(target[key]));
  const [attrs, result] = ObjectSeparation(target, attrsKeys);
  return { ...attrs, ...DynamicAttrsByObject(result, attrs, templates) };
}
