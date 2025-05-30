const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const errorHandler = require('./middlewares/error');

const authRoutes = require('./routes/authRoute');
const jobRoutes = require('./routes/jobRoute');
const candidateRoutes = require('./routes/candidateRoute');
const recruiterRoutes = require('./routes/recruiterRoute');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/recruiter', recruiterRoutes);

// app.use(errorHandler);

module.exports = app;