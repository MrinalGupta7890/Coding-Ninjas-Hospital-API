// Import the required modules
const passport = require('passport');
const Doctor = require('../models/doctor');

// Import the required modules for JWT authentication strategy
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Create options object for JWT strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Extract JWT token from the request's Authorization header
opts.secretOrKey = 'secret'; // Secret key to decode the JWT token

// Define a new JWT strategy for passport authentication
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // Find a Doctor in the database based on the ID from the JWT payload
    Doctor.findOne({ id: jwt_payload.id }, function(err, user) {
        if (err) {
            return done(err, false); // Return error if there's an issue
        }
        if (user) {
            return done(null, user); // Return the user if found in the database
        } else {
            return done(null, false); // Return false if user not found
            // Alternatively, you could create a new account here
        }
    });
}));

// Export the configured passport module
module.exports = passport;
