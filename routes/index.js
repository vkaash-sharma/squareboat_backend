const express = require('express');
const router = express.Router();
const { helloWorld } = require('../controllers/sampleController');
const { signUpFn, loginFn } = require('../controllers/user.controller.js');
router.get('/', helloWorld);


// Import other routes

// Router for user-related routes
router.post('/auth/login', loginFn);
router.post('/auth/signup', signUpFn);

// Uncomment and define other routes as needed

// const userRoutes = require('./users.routes');
// const recruiterRoutes = require('./recruiter.routes');
// router.post('/createUser' , )
// router.use('/users',, require('./user.route.js'));
// router.use('/recruiter',, require('./recruiter.route.js'));    

module.exports = router;
