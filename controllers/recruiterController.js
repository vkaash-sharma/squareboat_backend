const Application = require('../models/Application');
const Job = require('../models/jobs');

const getJobApplicants = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    const jobIds = jobs.map(job => job._id);
    
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job', 'title')
      .populate('candidate', 'firstName lastName email skills');
    
    res.status(200).json({
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

module.exports = { getJobApplicants };