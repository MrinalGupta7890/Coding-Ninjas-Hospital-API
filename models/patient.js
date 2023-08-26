// Import the Mongoose library
const mongoose = require("mongoose");

// Define the schema for patients
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide patient Name"], // Name is a required field
        unique: true, // Name should be unique for each patient
    },
    reports: [
        {
            status: {
                type: String,
                required: true,
                enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"], // Report status should be one of these values
            },
            date: {
                type: Date,
                required: true,
            }
        },
    ],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Referencing the "Doctor" model
        required: true, // Each patient must be associated with a doctor
    },
});

// Create a model named "Patient" based on the defined schema
const Patient = new mongoose.model("Patient", patientSchema);

// Export the Patient model
module.exports = Patient;
