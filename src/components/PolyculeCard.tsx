import AnimatedNumber from '../ui/AnimatedNumber';
import AppContext from './AppContext';
import React from 'react';
import classNames from 'classnames';
import normalizeCompatibilityScore from '../util/normalizeCompatibilityScore';
import useClickableAction from '../hooks/useClickableAction';
import type { Polycule } from '../types';

type Props = {
  onCardClick: (polycule: Polycule) => void;
  polycule: Polycule;
  position: number;
  size: 'large' | 'medium' | 'small';
};

export default function PolyculeCard({
  onCardClick,
  polycule,
  position,
  size,
}: Props): JSX.Element {
  const [isAnimationEnded, setIsAnimationEnded] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const { hasLoadedOnce } = React.useContext(AppContext);
  const { score } = polycule.compatibility;

  const peopleNames = polycule.characters.map(c => c.name).join(', ');

  const onTickerAnimationEnd = React.useCallback(
    () => setIsAnimationEnded(true),
    [],
  );
  const onMouseOver = React.useCallback(() => setIsHovering(true), []);
  const onMouseOut = React.useCallback(() => setIsHovering(false), []);
  const [onClick, onKeyPress] = useClickableAction(
    () => onCardClick(polycule),
    [polycule, onCardClick],
  );

  const cardClassNames = classNames(
    'relative bg-white border border-gray-300 rounded shadow-md cursor-pointer hover:border-gray-400 hover:shadow-2xl hover:transition-all transition-all',
    {
      'p-8 w-96': size === 'large',
      'py-4 px-6 w-56': size === 'medium',
      'py-2 w-96 flex divide-x divide-gray-300 px-2': size === 'small',
    },
  );

  const badgeClassNames = classNames(
    'absolute font-mono top-0 left-0 px-2 py-1 -mt-2 -ml-2 text-white bg-red-600 border rounded hover:transition-all transition-all',
    {
      'shadow-md border-red-700': !isHovering,
      'shadow-2xl border-red-800': isHovering,
    },
  );

  const characterNamesClassNames = classNames(
    'capitalize text-center transition-all duration-200',
    {
      'tracking-wider text-2xl': size === 'large',
      'tracking-wide text-lg': size === 'medium',
      'tracking-wide px-2 flex-1': size === 'small',
      blur: !isAnimationEnded,
      'blur-none': isAnimationEnded,
    },
  );

  if (size === 'large' || size === 'medium') {
    return (
      <div
        role="button"
        tabIndex={0}
        className={cardClassNames}
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
        onMouseOut={onMouseOut}
        onBlur={onMouseOut}
        onClick={onClick}
        onKeyPress={onKeyPress}
      >
        <div className={badgeClassNames}>{position}</div>
        <div className="flex flex-col items-center space-y-4">
          <p className={characterNamesClassNames}>{peopleNames}</p>
          <p className={size === 'large' ? 'text-8xl' : 'text-5xl'}>
            <AnimatedNumber
              useDurationNoise
              key={polycule.id}
              durationMs={hasLoadedOnce ? 500 : 3500}
              initialNumber={0}
              finalNumber={score}
              numberTransformer={x => normalizeCompatibilityScore(x)}
              onAnimationEnd={onTickerAnimationEnd}
            />
          </p>
        </div>
      </div>
    );
  }

  // size is 'small'
  return (
    <div
      role="button"
      tabIndex={0}
      className={cardClassNames}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <div className="flex-none px-2 font-mono text-center">{position}</div>
      <p className={characterNamesClassNames}>{peopleNames}</p>
      <p className="px-2">
        <AnimatedNumber
          useDurationNoise
          initialNumber={0}
          finalNumber={score}
          numberTransformer={x => normalizeCompatibilityScore(x)}
          onAnimationEnd={onTickerAnimationEnd}
          durationMs={hasLoadedOnce ? 500 : 2500}
        />
      </p>
    </div>
  );
}
