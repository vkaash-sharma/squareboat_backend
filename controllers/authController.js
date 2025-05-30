const User = require('../models/Users.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../config/email');

const signup = async (req, res) => {
  try {
    const { email, password, userType, firstName, lastName, company, skills } = req.body;
    
    let userData = { email, password, userType, firstName, lastName };
    if (userType === 'recruiter') userData.company = company;
    if (userType === 'candidate') userData.skills = skills;
    
    const user = await User.create(userData);
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    // Send welcome email
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Job Website',
      message: `Hi ${user.firstName}, Welcome to our job platform!`,
    });
    
    res.status(201).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Incorrect email or password');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { signup, login };