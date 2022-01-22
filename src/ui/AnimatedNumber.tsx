import React from 'react';

type Props = {
  finalNumber: number;
  initialNumber: number;
  durationMs?: number;

  /**
   * Don't make the animation last exactly `durationMs`, instead allow
   * +/- `noiseFactor`%. This way the duration has some noise to it,
   * which is nice for when you have lots of animated numbers
   * rendering at the same time. It keeps them all from ending at the
   * same time.
   */
  useDurationNoise?: boolean;

  /** A fuzzy factor from 0-1 to add some noise to our `durationMs` */
  noiseFactor?: number;

  /** Renderer function for the number to display */
  numberTransformer?: (num: number) => React.ReactNode;
  onAnimationEnd?: () => void;
};

function getNoisyDuration(duration: number, noiseFactor: number): number {
  if (noiseFactor === 0) {
    return duration;
  }

  return duration + duration * noiseFactor * Math.random();
}

export default function AnimatedNumber({
  finalNumber,
  initialNumber,
  onAnimationEnd,
  useDurationNoise = false,
  noiseFactor = 0.5,
  durationMs = 2000,
  numberTransformer = x => x,
}: Props): JSX.Element {
  const [currentNumber, setCurrentNumber] = React.useState(initialNumber);
  const prevTimestamp = React.useRef(+new Date());
  const changePerMs = React.useMemo(
    () =>
      (finalNumber - initialNumber) /
      getNoisyDuration(durationMs, useDurationNoise ? noiseFactor : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const updateNumber = React.useCallback(() => {
    const currTimestamp = +new Date();
    const timeElapsed = currTimestamp - prevTimestamp.current;
    const delta = timeElapsed * changePerMs;
    setCurrentNumber(prevNumber => Math.min(prevNumber + delta, finalNumber));
    prevTimestamp.current = currTimestamp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (currentNumber < finalNumber) {
      requestAnimationFrame(() => {
        updateNumber();
      });
    } else if (onAnimationEnd) {
      onAnimationEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  return <>{numberTransformer(currentNumber)}</>;
}
