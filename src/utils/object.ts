// 获取对象类型
const getType = (target: any) => Object.prototype.toString.call(target).slice(8, -1);

// 深拷贝
function ObjectDeepCopy(target: any) {
  return JSON.parse(JSON.stringify(target));
}

// 获取指定键
function ObjectFilter(target: any, keys: string[]) {
  return keys.reduce(function (prev, curr) {
    return Object.assign(prev, { [curr]: target[curr] });
  }, {});
}

// 删除指定键
function ObjectFilterKey(target: any, keys: string[]) {
  const result: { [key: string]: any } = {};
  for (const key of Object.keys(target)) {
    if (!keys.includes(key)) {
      result[key] = target[key];
    }
  }
  return result;
}

// 对象合并
function ObjectMerge(target: any, ...args: any[]) {
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
