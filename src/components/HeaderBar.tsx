import { ANYONE, CHARACTERS } from '../constants';
import Button from '@mui/material/Button';
import MultiSelect from '../ui/MultiSelect';

const POLYCULE_SIZES = new Array(CHARACTERS.length - 1)
  .fill(1)
  .map((_, i) => i + 2);

const CHARACTER_NAMES = [ANYONE].concat(CHARACTERS.map(char => char.name));

type Props = {
  characterFilter: readonly string[];
  onCharacterFilterChange: (sizes: readonly string[]) => void;
  onPolyculeSizeChange: (sizes: readonly number[]) => void;
  polyculeSizes: readonly number[];
};

export default function HeaderBar({
  characterFilter,
  onCharacterFilterChange,
  onPolyculeSizeChange,
  polyculeSizes,
}: Props): JSX.Element {
  return (
    <div className="w-full fixed shadow z-10 flex justify-between items-center bg-white pt-4 pb-2 px-12">
      <div>
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
      <div className="space-x-4">
        <Button variant="outlined">Edit characters</Button>
        <Button variant="outlined">Add yourself</Button>
      </div>
    </div>
  );
}
