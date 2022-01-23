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
      <div key={trait.key}>
        {TraitsUtil.getName(trait.key)} |{' '}
        {normalizeCompatibilityScore(trait.score)}
      </div>
    ));

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className="mx-24 my-8 space-y-8">
        <h1 className="text-3xl tracking-widest uppercase">{peopleNames}</h1>

        <div className="flex text-lg divide-x divide-gray-700">
          <div className="pr-12 space-y-4">
            <h2 className="text-xl tracking-wider uppercase">Overall score</h2>
            <div className="text-4xl">{normalizeCompatibilityScore(score)}</div>
          </div>

          <div className="px-12 space-y-4">
            <h2 className="text-xl tracking-wider uppercase">
              Most compatible traits
            </h2>
            {renderTraitsBlock(topTraits)}
          </div>
          <div className="pl-12 space-y-4">
            <h2 className="text-xl tracking-wider uppercase">
              Least compatible traits
            </h2>
            {renderTraitsBlock(worstTraits)}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
