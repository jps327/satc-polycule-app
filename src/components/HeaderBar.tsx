import * as React from 'react';
import { ANYONE, CHARACTERS } from '../constants';
import Button from '@mui/material/Button';
import EditCharactersModal from './EditCharactersModal';
import MultiSelect from '../ui/MultiSelect';

const SHOW_EXPERIMENTAL_FEATURES = false;

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
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

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
      {SHOW_EXPERIMENTAL_FEATURES ? (
        <div className="space-x-4">
          <Button variant="outlined" onClick={() => setIsEditModalOpen(true)}>
            Edit characters
          </Button>
          <Button variant="outlined">Add yourself</Button>
          <EditCharactersModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
