// Dependencies
const fs = require("fs");

// UUID npm package(ids)
const { v4: uuidv4 } = require('uuid');


// routing
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {

        // Read db.json file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("GET request - Returning notes data: " + JSON.stringify(data));

        // Send read data to response of GET request
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {

        // new note from request body.  
        const newNote = request.body;

        console.log("POST request - New Note: " + JSON.stringify(newNote));

        // Assigned id 
        newNote.id = uuidv4();

        // Read data from db.json
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // Pushed new note
        data.push(newNote);

        //  notes data to db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(data));

        console.log("Successfully added new note to db.json file.");

        // Send response
        response.json(data);
    });


    //Delete request
     app.delete("/api/notes/:id", (request, response) => {
        //get id to delete
        let noteId = request.params.id;
        
        console.log(`DELETE note request for noteId: ${noteId}`);

        //read data from db.json
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        //filter data to get all notes except the deleted note
        const newData = data.filter( note => note.id !== noteId );

        //write new data to db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        console.log(`Successfully deleted note with id : ${noteId}`);

        //send response
        response.json(newData);
    });
}
