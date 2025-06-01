const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const { getAllJobs, createJob, applyForJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/', getAllJobs);
router.post('/', protect, createJob);
router.post('/apply', protect ,restrictTo('candidate'), applyForJob);

module.exports = router;