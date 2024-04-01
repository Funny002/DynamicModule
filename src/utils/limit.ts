// 防抖
export function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

// 节流
export function throttle(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, timeout);
  };
}
