export async function sleepAnimation(ms: number) {
  const { promise, resolve } = Promise.withResolvers<void>();

  let zeroTime: DOMHighResTimeStamp;

  const ticker = (currentTime: DOMHighResTimeStamp) => {
    if (currentTime - zeroTime >= ms) {
      resolve();
      return;
    }

    window.requestAnimationFrame(ticker);
  };

  requestAnimationFrame((z: DOMHighResTimeStamp) => {
    zeroTime = z;
    ticker(z);
  });

  return promise;
}

export function handleForwardedRef<T>(ref: T, forwardedRef: React.ForwardedRef<T>) {
  if (typeof forwardedRef === 'function') {
    forwardedRef(ref);
  }
  else if (forwardedRef) {
    forwardedRef.current = ref;
  }
}

export function combineRefs<T>(...refs: React.Ref<T>[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      }
      else if (ref) {
        ref.current = value;
      }
    });
  };
};