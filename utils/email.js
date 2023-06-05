const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.NODE_ENV === 'production'
      ? 465
      : 587,
    secure: process.env.NODE_ENV === 'production'
      ? true
      : false,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  module.exports = { transporter }