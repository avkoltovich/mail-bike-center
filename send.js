// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');

// config for mailserver and mail, input your data
const config = {
  mailserver: {
    service: 'gmail',
    auth: {
        user: 'avkoltovich.test@gmail.com',
        pass: 'Dc1950nb'
    }
  },
  mail: {
    from: 'avkoltovich.test@gmail.com',
    to: 'avkoltovich@mail.ru, avkoltovich@yandex.ru, avkoltovich@gmail.com',
    subject: 'Hello from NodeJS!',
    html: {path: './send/index.html'}
  }
};

const sendMail = async ({ mailserver, mail }) => {
  // create a nodemailer transporter using smtp
  let transporter = nodemailer.createTransport(mailserver);

  // send mail using transporter
  let info = await transporter.sendMail(mail);

  console.log(`Done`);
};

sendMail(config).catch(console.error);
