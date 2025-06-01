const nodemailer = require('nodemailer');

const sendEmail = async options => {
  try {
    
  console.log('Sending email to:', process.env.EMAIL_HOST , process.env.EMAIL_PORT , process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const mailOptions = {
    from: 'Job Website <no-reply@hello.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  
   transporter.sendMail(mailOptions , (error , info) => {
    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
    console.log('Email sent successfully:', info);

  });
  }catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };