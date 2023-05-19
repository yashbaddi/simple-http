export function once(func, defaultReturn = undefined) {
  //Function that executes only once
  let isExecuted = false;
  return () => {
    if (!isExecuted) {
      isExecuted = true;
      func();
    } else {
      return defaultReturn;
    }
  };
}
