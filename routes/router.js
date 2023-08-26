// Import required modules and controllers
const express = require('express');
const passport = require('passport');
const {
    registerDoctor,
    registerPatient,
    createReport,
    all_reports,
    AllReports,
    login
} = require('../controllers/userController'); // Import controller functions

const router = express.Router(); // Create a new router instance

// Route for doctor registration
router.post('/doctors/register', registerDoctor);

// Route for doctor login
router.post('/login', login);

// Route for patient registration
router.post(
    '/patients/register',
    passport.authenticate('jwt', { session: false }), // Authenticate using JWT strategy
    registerPatient
);

// Route for creating a medical report for a patient
router.post(
    '/patients/:id/create_report',
    passport.authenticate('jwt', { session: false }), // Authenticate using JWT strategy
    createReport
);

// Route for fetching all reports of a patient
router.get('/patients/:id/all_report', all_reports);

// Route for fetching all reports based on status
router.get('/reports/:status', AllReports);

module.exports = router; // Export the router
