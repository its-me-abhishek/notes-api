const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/notes');
const basicAuth = require('express-basic-auth');

const app = express()
const port = 3000;

mongoose.connect('mongodb://localhost/note-api', {
    useNewUrlParser: true, useUnifiedTopology: true,
});

// basic authentication
const users = {
    'username': '1234',
};

app.use(basicAuth({
    users,
    challenge: true,
    unauthorizedResponse: 'Unauthorized Access',
}));

// data validation
const validateNote = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    if (title.length > 100 || content.length > 1000) {
        return res.status(400).json({ error: 'Title and content must be within specified lengths' });
    }

    next();
};

// main endpoint
app.get('/', (req, res) => { res.send('Welcome to the Note API'); },);

// create a note
app.post('/notes', validateNote, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// retrieve all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// retrieve a single note by its id
app.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update a note using its ID
app.put('/notes/:id', validateNote, async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete a note by its id
app.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
app.listen(port, () => console.log(`Note api app is listening on port ${port}!`))