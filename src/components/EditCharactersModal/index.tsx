import { CHARACTERS } from '../../constants';
import BasicModal from '../../ui/BasicModal';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EditCharactersModal({
  open,
  onClose,
}: Props): JSX.Element {
  const characterNameElts = CHARACTERS.map(character => (
    <div key={character.name}>{character.name}</div>
  ));

  return (
    <BasicModal title="Edit characters" open={open} onClose={onClose}>
      {characterNameElts}
    </BasicModal>
  );
}
