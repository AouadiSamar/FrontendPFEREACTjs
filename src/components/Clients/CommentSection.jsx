import React, { useEffect, useState } from 'react';
import AxiosInstance from '../Axios';
import { Box, Button, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types'; // Import PropTypes

const CommentSection = ({ clientId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/clients/${clientId}/comments/list/`);
        console.log(response.data); // Vérifiez la réponse de l'API
        setComments(response.data);
      } catch (error) {
        setError('Error fetching comments');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchComments();
  }, [clientId]);
  
  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await AxiosInstance.post(`/api/v1/clients/${clientId}/comments/`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };



  if (loading) return <Typography>Loading comments...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText 
              primary={comment.content} 
            />
       
          </ListItem>
        ))}
      </List>
      <Box mt={2} display="flex" alignItems="center">
        <TextField
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          startIcon={<SendIcon />}
          style={{ marginLeft: '10px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

CommentSection.propTypes = {
  clientId: PropTypes.number.isRequired, // Define propTypes for clientId
};

export default CommentSection;
