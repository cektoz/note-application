import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const created_at = new Date();
        const response = await axios.post('http://localhost:4000/notes', {
        title,
        content,
        created_at: created_at
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Create Note</Typography>
      <form onSubmit={handleSubmit}>
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
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default CreateNote;
