const mongoose = require('mongoose');

const emailLogsSchema = new mongoose.Schema({
  _id: ObjectId,
  jobId: { type: ObjectId, ref: 'Job', required: true },
  candidateId: { type: ObjectId, ref: 'Candidate', required: true },
  recruiterId: { type: ObjectId, ref: 'Recruiter', required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'reviewed', 'rejected', 'accepted'], default: 'pending' },
  coverLetter: String,
  resumeUrl: String
});

module.exports = mongoose.model('emailLogs ', emailLogsSchema);
