import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv'
import { Sequelize, DataTypes } from 'sequelize';

//establish database connection using sequelize

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

try {
  await sequelize.sync();
  console.log('Database active');
} catch (err) {
  console.error('Error syncing database:', err);
}

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// GET all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific Note by id
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error('Error fetching note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content  });
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH a note
app.patch("/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const [updated] = await Note.update({ title, content }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Note not found" });
    const updatedNote = await Note.findByPk(req.params.id);
    res.json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const deleted = await Note.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
