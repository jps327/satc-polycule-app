import { CHARACTERS } from '../constants';
import AppContext from './AppContext';
import BestPolycule from './BestPolycule';
import FullList from './FullList';
import HonorableMentions from './HonorableMentions';
import MultiSelect from '../ui/MultiSelect';
import React from 'react';
import choose from '../util/choose';
import compatibility from '../util/compatibility';
import uniqueId from '../util/uniqueId';
import type { Character, Polycule } from '../types';

const POLYCULE_SIZES = new Array(CHARACTERS.length - 1)
  .fill(1)
  .map((_, i) => i + 2);

const ANYONE = 'Anyone';
const CHARACTER_NAMES = [ANYONE].concat(CHARACTERS.map(char => char.name));

export default function App(): JSX.Element {
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);
  const [polyculeSizes, setPolyculeSizes] = React.useState<readonly number[]>([
    3, 4, 5,
  ]);
  const [characterFilter, setCharacterFilter] = React.useState<
    readonly string[]
  >([ANYONE]);

  const appContext = React.useMemo(
    () => ({
      hasLoadedOnce,
    }),
    [hasLoadedOnce],
  );

  const polycules = React.useMemo(() => {
    const groups: Array<readonly Character[]> = [];
    polyculeSizes.forEach(k => {
      choose(CHARACTERS, k).forEach((polycule: readonly Character[]) =>
        groups.push(polycule),
      );
    });

    if (characterFilter.length === 1 && characterFilter[0] === ANYONE) {
      return groups;
    }

    return groups.filter(polycule => {
      const polyculeNames = new Set(polycule.map(c => c.name));
      return characterFilter.every(name => polyculeNames.has(name));
    });
  }, [polyculeSizes, characterFilter]);

  const polyculeResults: readonly Polycule[] = React.useMemo(() => {
    const allPolycules = polycules.map(polycule => ({
      id: uniqueId(),
      characters: polycule,
      compatibility: compatibility(polycule),
    }));

    // sort by compatibility score
    return allPolycules.sort(
      (s1, s2) => s2.compatibility.score - s1.compatibility.score,
    );
  }, [polycules]);

  const onPolyculeSizeChange = React.useCallback((sizes: readonly number[]) => {
    setPolyculeSizes(prevSizes => {
      if (sizes.length === 0) {
        // do not allow empty selection. We keep the previous selection.
        return prevSizes;
      }
      return sizes;
    });
  }, []);

  const onCharacterFilterChange = React.useCallback(
    (charNames: readonly string[]) => {
      setCharacterFilter(prevCharacterFilter => {
        // do not allow empty selection. We default things back to 'ANYONE'
        if (charNames.length === 0) {
          return [ANYONE];
        }

        // if we chose ANYONE then deselect all the others
        if (
          !prevCharacterFilter.includes(ANYONE) &&
          charNames.includes(ANYONE)
        ) {
          return [ANYONE];
        }

        // remove ANYONE if we chose someone's name
        if (charNames.length > 1 && charNames.includes(ANYONE)) {
          return charNames.filter(name => name !== ANYONE);
        }
        return charNames;
      });
    },
    [],
  );

  React.useEffect(() => {
    setHasLoadedOnce(true);
  }, []);

  return (
    <AppContext.Provider value={appContext}>
      <div className="font-sans bg-gray-100 text-slate-900">
        <div className="container flex flex-col items-center py-4 mx-auto space-y-8">
          <div className="w-full">
            <MultiSelect
              label="Polycule Size"
              labelId="polycule-size-select"
              onChange={onPolyculeSizeChange}
              options={POLYCULE_SIZES}
              selectedValues={polyculeSizes}
            />

            <MultiSelect
              label="Show polycules with"
              labelId="polycule-people-filter"
              onChange={onCharacterFilterChange}
              options={CHARACTER_NAMES}
              selectedValues={characterFilter}
            />
          </div>
          <BestPolycule polycule={polyculeResults[0]} />
          <HonorableMentions polycules={polyculeResults.slice(1, 4)} />
          <FullList polycules={polyculeResults} />
        </div>
      </div>
    </AppContext.Provider>
  );
}
