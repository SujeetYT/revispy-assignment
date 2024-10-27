import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: process.env.NODE_MAILER_USERNAME,
      pass: process.env.NODE_MAILER_PASSWORD
  }
});

export default transporter;