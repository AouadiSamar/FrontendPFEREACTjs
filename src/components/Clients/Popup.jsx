// src/components/Clients/Popup.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Importez PropTypes
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Popup = ({ open, onClose, comment, onSave, onDelete, onLike }) => {
  const [text, setText] = useState(comment ? comment.text : '');

  const handleSave = () => {
    if (onSave) onSave(text);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && comment) onDelete(comment.id);
    onClose();
  };

  const handleLike = () => {
    if (onLike && comment) onLike(comment.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{comment ? 'Edit Comment' : 'Add Comment'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Comment"
          type="text"
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {comment && (
          <>
            <IconButton onClick={handleLike} color="primary">
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleDelete} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        )}
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Définir les PropTypes pour le composant Popup
Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onLike: PropTypes.func
};

Popup.defaultProps = {
  comment: null,
  onDelete: () => {},
  onLike: () => {}
};

export default Popup;
