// load data from db.json
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

        // Pushed new note in db.json
        notesData.push(newNote);

        // notes data to db.json
        fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {

            if(err) throw(err);

            console.log("New note successfully added to db.json.");

        });

        console.log("Notes : "+JSON.stringify(notesData));

        response.json(newNote);
    });
};