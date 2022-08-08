// load data from db.json
const notesData = require("../db/db.json");
// const fs = require('fs');

// Routing
module.exports = function (app, fs) {

    // API GET Requests
    app.get("/api/notes", function(request, response){

        response.send(notesData);
    });
};