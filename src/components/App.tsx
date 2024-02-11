import * as React from 'react';
import { ANYONE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import AppContext from './AppContext';
import BestPolycule from './BestPolycule';
import FullList from './FullList';
import HeaderBar from './HeaderBar';
import HonorableMentions from './HonorableMentions';
import PolyculeProfileDrawer from './PolyculeProfileDrawer';
import choose from '../util/choose';
import compatibility from '../util/compatibility';
import uniqueId from '../util/uniqueId';
import type { Character, Polycule } from '../types';

export default function App(): JSX.Element {
  const [polyculeToView, setPolyculeToView] = React.useState<
    Polycule | undefined
  >(undefined);
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);
  const [polyculeSizes, setPolyculeSizes] = React.useState<readonly number[]>(
    [],
  );
  const [characterFilter, setCharacterFilter] = React.useState<
    readonly string[]
  >([ANYONE]);

  const [genderFilter, setGenderFilter] = React.useState<readonly string[]>([
    'Men',
    'Women',
  ]);

  const { data: characters, isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: async (): Promise<readonly Character[]> => {
      const response = await fetch('/data');
      if (response.ok) {
        const json = await response.json();
        return json.characters;
      }
      throw new Error('Network response was not ok');
    },
  });

  const maleCharacters = React.useMemo(
    () =>
      (characters || []).filter(
        char => char.gender === 'Male' || char.gender === 'Nonbinary',
      ),
    [characters],
  );
  const femaleCharacters = React.useMemo(
    () =>
      (characters || []).filter(
        char => char.gender === 'Female' || char.gender === 'Nonbinary',
      ),
    [characters],
  );

  React.useEffect(() => {
    if (isLoading === false) {
      setPolyculeSizes(
        Math.max(maleCharacters.length, femaleCharacters.length) >= 5
          ? [3, 4, 5]
          : [2],
      );
    }
  }, [maleCharacters, femaleCharacters, isLoading]);

  const appContext = React.useMemo(
    () => ({
      hasLoadedOnce,
    }),
    [hasLoadedOnce],
  );

  const polycules = React.useMemo(() => {
    if (isLoading || characters.length <= 1) {
      return [];
    }

    const groups: Array<readonly Character[]> = [];

    // process male groups
    if (maleCharacters.length >= 2 && genderFilter.includes('Men')) {
      polyculeSizes.forEach(k => {
        if (k <= maleCharacters.length) {
          choose(maleCharacters, k).forEach((polycule: readonly Character[]) =>
            groups.push(polycule),
          );
        }
      });
    }

    // process female groups
    if (femaleCharacters.length >= 2 && genderFilter.includes('Women')) {
      polyculeSizes.forEach(k => {
        if (k <= femaleCharacters.length) {
          choose(femaleCharacters, k).forEach(
            (polycule: readonly Character[]) => groups.push(polycule),
          );
        }
      });
    }

    if (characterFilter.length === 1 && characterFilter[0] === ANYONE) {
      return groups;
    }

    return groups.filter(polycule => {
      const polyculeNames = new Set(polycule.map(c => c.name));
      return characterFilter.every(name => polyculeNames.has(name));
    });
  }, [
    genderFilter,
    polyculeSizes,
    characterFilter,
    maleCharacters,
    femaleCharacters,
    isLoading,
    characters,
  ]);

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

  const onPolyculeCardClick = React.useCallback((polycule: Polycule) => {
    setPolyculeToView(polycule);
  }, []);

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

  const profileDrawer = (
    <PolyculeProfileDrawer
      open={polyculeToView !== undefined}
      onClose={() => setPolyculeToView(undefined)}
      polycule={polyculeToView}
    />
  );

  return (
    <AppContext.Provider value={appContext}>
      <div className="font-sans bg-gray-100 text-slate-900">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {characters && characters.length > 1 ? (
              <>
                <HeaderBar
                  characters={characters ?? []}
                  maleCharacters={maleCharacters ?? []}
                  femaleCharacters={femaleCharacters ?? []}
                  characterFilter={characterFilter}
                  genderFilter={genderFilter}
                  onCharacterFilterChange={onCharacterFilterChange}
                  onGenderFilterChange={setGenderFilter}
                  onPolyculeSizeChange={onPolyculeSizeChange}
                  polyculeSizes={polyculeSizes}
                />
                <div className="container pt-32 flex flex-col items-center mx-auto space-y-8 pb-8">
                  {polyculeResults.length > 0 ? (
                    <>
                      <BestPolycule
                        onCardClick={onPolyculeCardClick}
                        polycule={polyculeResults[0]}
                      />
                      <HonorableMentions
                        onCardClick={onPolyculeCardClick}
                        polycules={polyculeResults.slice(1, 4)}
                      />
                      <FullList
                        onCardClick={onPolyculeCardClick}
                        polycules={polyculeResults}
                      />
                    </>
                  ) : (
                    <p>There are no polycules to show.</p>
                  )}
                </div>
              </>
            ) : (
              <p>There are no people to show.</p>
            )}
          </>
        )}
      </div>
      {profileDrawer}
    </AppContext.Provider>
  );
}
