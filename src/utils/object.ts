// 获取对象类型
export const getType = (target: any) => Object.prototype.toString.call(target).slice(8, -1).toLowerCase();

// 判断类型
export const isType = (target: any, type: string) => getType(target) === type.toLowerCase();

// 深拷贝
export function ObjectDeepCopy(target: any) {
  return JSON.parse(JSON.stringify(target));
}

// 对象合并
export function ObjectMerge(target: any, ...args: any[]) {
  const result: { [key: string]: any } = ObjectDeepCopy(target);
  for (const item of args.filter(v => ['Object', 'Array'].includes(getType(v)))) {
    for (const key of Object.keys(item)) {
      const [t1, t2] = [getType(result[key]), getType(item[key])];
      if (t2 === 'Array') {
        result[key] = [...item[key]];
      } else if (t2 === 'Object' && t1 === 'Object') {
        result[key] = ObjectMerge(result[key], item[key]);
      } else {
        result[key] = item[key];
      }
    }
  }
  return result;
}

// 获取指定键
export function ObjectPick<T extends Record<string, any>, K extends keyof T>(target: T, keys: K[]): Pick<T, K> {
  return keys.reduce(function (prev, curr) {
    return Object.assign(prev, { [curr]: target[curr] });
  }, {} as Pick<T, K>);
}

// 删除指定键
export function ObjectOmit<T extends Record<string, any>, K extends keyof T>(target: T, keys: K[]): Omit<T, K> {
  return Object.keys(target).reduce((prev, curr) => {
    if (!keys.includes(curr as K)) {
      prev[curr as keyof Omit<T, K>] = target[curr];
    }
    return prev;
  }, {} as Omit<T, K>);
}

// 分割对象
export function ObjectSeparation<T extends Record<string, any>, K extends keyof T>(target: T, keys: K[]): [Omit<T, K>, Pick<T, K>] {
  const separationResult: Record<string, any> = {};
  const result: Record<string, any> = {};
  for (const key of Object.keys(target)) {
    if (keys.includes(key as K)) {
      separationResult[key] = target[key];
    } else {
      result[key] = target[key];
    }
  }
  return [result, separationResult] as [Omit<T, K>, Pick<T, K>];
}
