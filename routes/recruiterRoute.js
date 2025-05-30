const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const { getJobApplicants } = require('../controllers/recruiterController');

const router = express.Router();

router.use(protect, restrictTo('recruiter'));
router.get('/applicants', getJobApplicants);

module.exports = router;