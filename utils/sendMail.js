const _ = require('lodash')
const nodemailer = require('nodemailer')

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)

const defaultMail = {
  from: process.env.FROM_MAIL,
  text: 'Hey there, its our first message sent with Nodemailer',
}

const sendMail = (to, subject, html) => {
  // use default setting
  mail = _.merge({ html }, defaultMail, to)

  // send email
  transporter.sendMail(mail, function (error, info) {
    if (error) return console.log(error)
    console.log('mail sent:', info.response)
  })
}
module.exports = sendMail
