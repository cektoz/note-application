import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function DisplayNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>My Notes:</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ border: '1px solid #ccc' }}>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography>{note.content}</Typography>
                  <Typography variant="caption">Date: {new Date(note.created_at).toLocaleString()}</Typography>
                </TableCell>
                <TableCell align='right' >
                  <Button component={Link} to={`/update/${note.id}`} variant="contained" color="primary" style={{ marginLeft: '520px' }}>
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(note.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DisplayNotes;
