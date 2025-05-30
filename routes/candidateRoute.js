const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const { getAppliedJobs } = require('../controllers/candidateController');

const router = express.Router();

router.use(protect, restrictTo('candidate'));
router.get('/applications', getAppliedJobs);

module.exports = router;