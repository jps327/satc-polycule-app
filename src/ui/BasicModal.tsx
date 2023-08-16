import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
};

const STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};

export default function BasicModal({
  children,
  open,
  onClose,
  title,
}: Props): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-character-modal-title"
      aria-describedby="edit-character-modal-description"
    >
      <Box sx={STYLE}>
        <div className="px-8 py-6 border-b">
          <h1
            id="edit-character-modal-title"
            className="text-3xl uppercase tracking-wider"
          >
            {title}
          </h1>
        </div>
        <div className="px-8 py-8">{children}</div>
      </Box>
    </Modal>
  );
}
