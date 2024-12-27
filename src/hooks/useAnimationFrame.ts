import { useEffect, useLayoutEffect, useRef } from "react";

// https://gist.github.com/pablomayobre/f39fff234043452c8935448f45d42b55

const useAnimationFrame = (callback: (dt: number) => any) => {
  const callbackRef = useRef(callback);
  const frameRef = useRef<number>(0);
  const timerRef = useRef<number>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const loop = (time: number) => {
      frameRef.current = requestAnimationFrame(loop);

      let dt = 0;
      if (timerRef.current !== undefined && timerRef.current !== null)
        dt = time - timerRef.current;

      const callback = callbackRef.current;
      callback(dt / 1000);

      timerRef.current = time;
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export { useAnimationFrame };
