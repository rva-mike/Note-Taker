// LOAD Data from db.json
const notesData = require("../db/db.json");
// const fs = require('fs');

// routing
module.exports = function (app, fs) {

    // API GET Request
    app.get("/api/notes", (request, response) => {

        response.send(notesData);
    });

    // API POST Request
    app.post("/api/notes", (request, response) => {

        // take new note from request.  
        const newNote = request.body;

        let noteId = (notesData.length + 1).toString();

        newNote.id = noteId;

        // Pushed new note in db.json
        notesData.push(newNote);

        // notes data to db.json (write)
        fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
            
            if(err) throw(err);
            
            console.log("Successfully added new note to 'db.json' file!");

        });

        console.log("Notes : "+JSON.stringify(notesData));

        response.json(newNote);
    });
};