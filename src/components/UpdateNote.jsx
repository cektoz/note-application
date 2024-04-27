import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNoteDetails();
  }, []);

  const fetchNoteDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/notes/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching note details:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const created_at = new Date();
      await axios.patch(`http://localhost:4000/notes/${id}`, {
        title,
        content,
        created_at: created_at.toISOString()
      });
        navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Update Note</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          margin="normal"
          required
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={content}
          onChange={handleContentChange}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" >
          Update
        </Button>
      </form>
    </Box>
  );
}

export default UpdateNote;
