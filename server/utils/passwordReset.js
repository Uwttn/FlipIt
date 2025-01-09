// server.js (or wherever you configure Nodemailer)
require('dotenv').config();

const nodemailer = require('nodemailer');

// Now we can use process.env to access variables in .env
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,      // e.g., smtp.gmail.com
  port: process.env.MAIL_PORT,      // e.g., 587
  secure: false,                    // or true if using port 465
  auth: {
    user: process.env.MAIL_USER,    // e.g., your_email@gmail.com
    pass: process.env.MAIL_PASS,    // e.g., your app password
  },
});

// Example usage
async function forgotPassword(email) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER, // Often must match the authenticated user
      to: email,
      subject: 'Password Reset',
      text: 'Click here to reset your password: https://yourapp.com/reset',
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

module.exports = { forgotPassword };
