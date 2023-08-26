// Import required modules and configurations
const express = require("express"); // Express framework for building the app
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const db = require("./config/database"); // Import database configuration (not shown in the provided code)
const passport = require('passport'); // Authentication middleware
const passportStrategy = require('./config/passport'); // Import passport strategy configuration (not shown in the provided code)
const router = require("./routes/router"); // Import the router to define routes

const app = express(); // Create an Express app instance
const PORT = 8000; // Port number for the server

app.use(bodyParser.urlencoded({ extended: false })); // Configure body-parser middleware for URL-encoded data
app.use(bodyParser.json()); // Configure body-parser middleware for JSON data

app.use(router); // Use the defined router for routing requests

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server is giving an error: ${err}`); // Print error message if server fails to start
    } else {
        console.log("Server is successfully up and running"); // Print success message when the server starts successfully
    }
});
