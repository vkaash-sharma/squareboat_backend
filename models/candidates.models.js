const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, unique: true },
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      duration: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: Number
    }
  ],
  applications: [ObjectId] // References to JobApplication documents
});

module.exports = mongoose.model('candidates', candidatesSchema);
