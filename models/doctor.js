// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for doctors
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"] // Name is a required field
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"], // Password is a required field
        minLength: [6, "Password should be greater than 6 characters"] // Minimum length of the password
    },
});

// Create a model named "Doctor" based on the defined schema
const Doctor = new mongoose.model("Doctor", doctorSchema);

// Export the Doctor model
module.exports = Doctor;
