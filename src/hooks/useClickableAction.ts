import React from 'react';

type OnClickFn = () => void;
type OnKeyPressFn = (e: React.KeyboardEvent<HTMLElement>) => void;

export default function useClickableAction(
  onClickFn: () => void,
  dependencyArr: React.DependencyList,
): [OnClickFn, OnKeyPressFn] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClick = React.useCallback(() => onClickFn(), dependencyArr);
  const onKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        onClickFn();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencyArr,
  );

  return [onClick, onKeyPress];
}
