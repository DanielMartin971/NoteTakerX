const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);

            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 1)
            );

            break;
        }
    }
}

function createNote(body, notesArray) {
    const newNote = body;

    body.id = notesArray[0];
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 1)
    );

    return newNote;
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    console.log('This note was deleted: ' + req.params.id);
    res.json(true);
});

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, notes);
    console.log('This note was added: ' + req.params.title);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log('App listening on PORT: ' + PORT);
});