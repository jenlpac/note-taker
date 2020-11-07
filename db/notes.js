const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


class Storage {
    read() {
        return fs.readFile('db/db.json', 'utf8');
    }

    write(note) {
        return fs.writeFile('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read()
            .then(notes => {
                let parsedNotes = [].concat(JSON.parse(notes));
                return parsedNotes;
        });
    }

    postNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error ("'Title' and 'Text' cannot be blank.");
        }

        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
            .then(notes => {
                [...notes, newNote]
            })
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => { newNote });
    }

    deleteNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(newNotes => this.write(newNotes));

    }
}


module.exports = new Storage();