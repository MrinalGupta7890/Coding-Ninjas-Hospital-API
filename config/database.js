// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB server at the specified URL
mongoose.connect('mongodb://127.0.0.1:27017');

// Get the connection instance from Mongoose
const db = mongoose.connection;

// Set up an event listener for the 'error' event on the database connection
db.error('error', console.error.bind(console, "error in connecting with mongodb"));

// Set up an event listener for the 'open' event on the database connection
db.once('open', () => {
    console.log('succesfully connecting with mongo db');
});

// Export the database connection instance
module.exports = db;
