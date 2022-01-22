import React from 'react';

export default function useTimeout(callback: () => void, delay?: number): void {
  const savedCallback = React.useRef(callback);

  // Remember the latest callback if it changes
  React.useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  React.useEffect(() => {
    // Don't schedule if no delay is specified
    // NOTE: 0 is a valid value for delay, so we specifically check against
    // undefined
    if (delay === undefined) {
      return undefined;
    }

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
