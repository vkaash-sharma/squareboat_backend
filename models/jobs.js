const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skillsRequired: [String],
  location: String,
  salaryRange: {
    min: Number,
    max: Number,
    currency: String,
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);