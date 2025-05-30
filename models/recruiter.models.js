const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, unique: true },
  company: String,
  companyDescription: String,
  postedJobs: [ObjectId] // References to Job documents
});

module.exports = mongoose.model('recruiter', recruiterSchema);
