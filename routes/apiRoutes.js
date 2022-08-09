// Dependencies
const fs = require("fs");

let id = 1

// routing
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {

        // Read db.json file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("GET request - Returning notes data: " + JSON.stringify(data));
        
        // Send read data to response of 'GET' request
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {

        // new note from request body.  
        const newNote = request.body;
        
        console.log("POST request - New Note: " + JSON.stringify(newNote));

        // Assigned id 
        newNote.id = id ++;

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
}
