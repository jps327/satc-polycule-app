import { Drawer } from '@mui/material';
import React from 'react';
import TraitsUtil from '../util/TraitsUtil';
import normalizeCompatibilityScore from '../util/normalizeCompatibilityScore';
import usePrevious from '../hooks/usePrevious';
import type { Polycule, ScoredTrait } from '../types';

type Props = {
  onClose: () => void;
  open: boolean;
  polycule: Polycule | undefined;
};

const EMPTY_POLYCULE = {
  compatibility: {
    score: 0,
    traits: [],
  },
  characters: [],
};

export default function PolyculeProfileDrawer({
  open,
  onClose,
  polycule,
}: Props): JSX.Element {
  // track the previous polyclue just so we can render something while the
  // drawer slides in/out
  const prevPolycule = usePrevious(polycule);
  const { compatibility, characters } =
    polycule || prevPolycule || EMPTY_POLYCULE;

  const peopleNames = characters.map(c => c.name).join(', ');
  const { score, traits } = compatibility;

  // sort traits from best to worst
  const sortedTraits = React.useMemo(
    () => [...traits].sort((t1, t2) => t2.score - t1.score),
    [traits],
  );

  const topTraits = sortedTraits.slice(0, 3);
  const worstTraits = sortedTraits.slice(sortedTraits.length - 3);

  const renderTraitsBlock = (
    traitsToRender: ScoredTrait[],
  ): React.ReactChild[] =>
    traitsToRender.map(trait => (
      <div className="text-left" key={trait.key}>
        {TraitsUtil.getName(trait.key)} |{' '}
        {normalizeCompatibilityScore(trait.score)}
      </div>
    ));

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className="sm:mx-24 my-4 sm:my-8 space-y-3 sm:space-y-8 px-12">
        <h1 className="text-3xl tracking-widest uppercase">{peopleNames}</h1>

        <div className="flex flex-col text-base sm:text-lg divide-y divide-gray-300 sm:divide-y-0 sm:divide-x sm:flex-row">
          <div className="pb-2 sm:pb-0 sm:pr-12 space-y-2 sm:space-y-4">
            <h2 className="text-lg tracking-wide sm:text-xl sm:tracking-wider uppercase">
              Overall score
            </h2>
            <div className="text-left text-4xl">
              {normalizeCompatibilityScore(score)}
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-12 space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl tracking-wide sm:tracking-wider uppercase">
              Most compatible traits
            </h2>
            {renderTraitsBlock(topTraits)}
          </div>
          <div className="sm:pl-12 space-y-2 sm:space-y-4">
            <h2 className="pt-2 sm:pt-0 text-lg sm:text-xl tracking-wide sm:tracking-wider uppercase">
              Least compatible traits
            </h2>
            {renderTraitsBlock(worstTraits)}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
