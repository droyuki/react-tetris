import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number): void => {
  const savedCallback = useRef<Function>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      typeof savedCallback.current === 'function' && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
