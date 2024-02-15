
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

export default function DeleteDialog({ open, onClose, onConfirm }:Props) {
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this question?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleDelete} color="secondary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
