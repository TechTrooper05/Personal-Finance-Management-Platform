const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.GOOGLE_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//   },
// });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    connectionTimeout: 10000,
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
        from: `"FinTrack" <${process.env.GOOGLE_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {sendEmail};