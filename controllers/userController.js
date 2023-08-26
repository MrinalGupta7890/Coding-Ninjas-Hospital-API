// Import required modules and models
const { json } = require('body-parser');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');

// Register a new doctor
module.exports.registerDoctor = async (req, res, next) => {
    try {
        // Create a new doctor using the data in the request body
        const doctor = await Doctor.create(req.body);

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Doctor created successfully",
        });
    } catch (error) {
        // Respond with error message if there's an issue
        res.status(500).json({
            success: false,
            message: "Error in creating Doctor, internal server error",
        });
    }
};

// Login a doctor
module.exports.login = async (req, res, next) => {
    try {
        // Find a doctor with the given credentials
        const user = Doctor.find(req.body);

        if (user) {
            // If doctor found, create a JWT token and respond with it
            const token = jwt.sign(user.id, "secret");
            res.status(200).json({
                success: true,
                token,
            });
        } else {
            // If doctor not found, respond with an error message
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        // Respond with a general error message
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// Register a new patient
module.exports.registerPatient = async (req, res, next) => {
    try {
        // Set the default doctor ID for the patient (modify as needed)
        req.body.doctor = "64e8717d1494ad2211038e0d";

        // Create a new patient using the data in the request body
        const patient = await Patient.create(req.body);

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Patient created successfully",
        });
    } catch (error) {
        // Respond with error message if there's an issue
        res.status(500).json({
            success: false,
            message: "Error in creating Patient, internal server error",
        });
    }
};

// Create a medical report for a patient
module.exports.createReport = async (req, res, next) => {
    try {
        // Find the patient by ID
        const patient = await Patient.findById(req.params.id);

        // Set the report date to the current date
        req.body.date = Date.now();

        // Add the new report to the patient's reports array
        patient.reports.push(req.body);

        // Save the updated patient data
        patient.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Report created successfully",
        });
    } catch (error) {
        // Respond with error message if there's an issue
        res.status(500).json({
            success: false,
            message: "Unable to create a report, Internal Server Error",
        });
    }
};

// Fetch all reports for a specific patient
module.exports.all_reports = async (req, res, next) => {
    try {
        // Find the patient by ID
        const patient = await Patient.findById(req.params.id);

        // Respond with patient's reports
        res.status(200).json({
            success: true,
            reports: patient.reports,
            message: "All Reports Retrieved Successfully",
        });
    } catch (error) {
        // Respond with error message if there's an issue
        res.status(500).json({
            success: false,
            message: "Unable to fetch the patient reports, Internal Server Error",
        });
    }
};

// Fetch all reports for patients with a specific status
module.exports.AllReports = async (req, res, next) => {
    try {
        // Find patients with reports having the specified status
        const patient = await Patient.find({
            reports: { $elemMatch: { status: req.params.status } },
        });

        // Respond with the retrieved data
        res.status(200).json({
            success: true,
            data: patient,
        });
    } catch (error) {
        // Respond with error message if there's an issue
        res.status(500).json({
            success: false,
            message: "Unable to fetch all the reports, Internal Server Error",
        });
    }
};
