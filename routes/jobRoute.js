const express = require('express');
const { protect } = require('../middleware/auth');
const { getAllJobs, createJob, applyForJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/', getAllJobs);
router.post('/', protect, createJob);
router.post('/apply', protect, applyForJob);

module.exports = router;