if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function<T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: any) => void;

    const promise = new Promise<T>((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });

    return {
      promise,
      resolve,
      reject,
    };
  };
}