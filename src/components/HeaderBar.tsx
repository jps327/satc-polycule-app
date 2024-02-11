import * as React from 'react';
import { ANYONE } from '../constants';
import { Character } from '../types';
import MultiSelect from '../ui/MultiSelect';

type Props = {
  characters: readonly Character[];
  maleCharacters: readonly Character[];
  femaleCharacters: readonly Character[];
  characterFilter: readonly string[];
  genderFilter: readonly string[];
  onCharacterFilterChange: (sizes: readonly string[]) => void;
  onGenderFilterChange: (sizes: readonly string[]) => void;
  onPolyculeSizeChange: (sizes: readonly number[]) => void;
  polyculeSizes: readonly number[];
};

export default function HeaderBar({
  characters,
  maleCharacters,
  femaleCharacters,
  characterFilter,
  genderFilter,
  onCharacterFilterChange,
  onGenderFilterChange,
  onPolyculeSizeChange,
  polyculeSizes,
}: Props): JSX.Element {
  const characterNames = [ANYONE].concat(characters.map(char => char.name));

  // only allow polycule sizes up to 8
  const polyculeSizeOptions = new Array(
    Math.min(Math.max(maleCharacters.length, femaleCharacters.length) - 1, 8),
  )
    .fill(1)
    .map((_, i) => i + 2);

  return (
    <div className="w-full fixed shadow z-10 flex justify-between items-center bg-white pt-4 pb-2 px-12">
      <div>
        <MultiSelect
          label="Polycule Size"
          labelId="polycule-size-select"
          onChange={onPolyculeSizeChange}
          options={polyculeSizeOptions}
          selectedValues={polyculeSizes}
        />

        <MultiSelect
          label="Show polycules with"
          labelId="polycule-people-filter"
          onChange={onCharacterFilterChange}
          options={characterNames}
          selectedValues={characterFilter}
        />

        <MultiSelect
          label="Show me"
          labelId="polycule-people-filter"
          onChange={onGenderFilterChange}
          options={['Men', 'Women']}
          selectedValues={genderFilter}
        />
      </div>
    </div>
  );
}
