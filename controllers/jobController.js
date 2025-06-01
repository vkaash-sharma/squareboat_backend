const Job = require('../models/jobs');
const Application = require('../models/Application');
const User = require('../models/Users.models');
const { sendEmail } = require('../config/email');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).populate('recruiter', 'firstName lastName company');
   return res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: { jobs },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, description, skillsRequired, location, salaryRange } = req.body;

    // we need to check if the user is a recruiter
    if (req.user.userType !== 'recruiter') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to create a job. Only recruiters can create jobs.',
      });
    }
    
    const job = await Job.create({
      title,
      description,
      recruiter: req.user.id,
      skillsRequired,
      location,
      salaryRange,
    });
    
    res.status(201).json({
      status: 'success',
      data: { job },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) throw new Error('No job found with that ID');
    
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    });
    
    if (existingApplication) {
      throw new Error('You have already applied for this job');
    }
    
    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      recruiter: job.recruiter,
      coverLetter,
    });
    
    // Send email notifications
    const candidate = await User.findById(req.user.id);
    const recruiter = await User.findById(job.recruiter);
    
    await sendEmail({
      email: candidate.email,
      subject: 'Job Application Submitted',
      message: `Hi ${candidate.firstName}, you have successfully applied for ${job.title}`,
    });
    
    await sendEmail({
      email: recruiter.email,
      subject: 'New Job Application',
      message: `Hi ${recruiter.firstName}, you have a new application for ${job.title} from ${candidate.firstName} ${candidate.lastName}`,
    });
    
    return res.status(201).json({
      status: 'success',
      data: { application },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { getAllJobs, createJob, applyForJob };