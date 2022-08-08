// Dependencies

const express = require("express");
// const fs = require("fs");

// Express configuration

//Tells node that we are creating an 'express' server
const app = express();

// sets up port for any port or 3001
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);




app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
})