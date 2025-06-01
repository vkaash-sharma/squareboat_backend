const Application = require('../models/Application');
const Job = require('../models/jobs');

const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate('job', 'title description')
      .populate('recruiter', 'firstName lastName company');
    
    return res.status(200).json({
      status: 'success',
      results: applications.length,
      data: { applications },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { getAppliedJobs };