import React from 'react';

/**
 * This hook allows you to keep track of a value's previous value.
 * Usage:
 *   function MyComponent({ myNum }): Props) {
 *     const prevNum = usePrevious(myNum);
 *     return <div>Current Number: {myNum}, Previous Number: {prevNum}</div>
 *   }
 *
 * @param value The value whose previous value you want to track
 * @returns The previous value (or undefined, if this is the first
 * time you are accessing the value)
 */
export default function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
