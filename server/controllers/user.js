const User = require('../models/userSchema')
const crypto = require('crypto')
const sendMail = require('../../utils/sendMail')

const registerUser = async (req, res) => {
  console.log(req.body)

  const { name, email, password } = req.body
  const user = await User.findOne({ email })

  if (user && user.active) {
    return res.status(400).json({
      success: false,
      msg: 'Entered email id already registered with us. Login to continue',
    })
  } else if (user && !user.active) {
    return res.status(400).json({
      success: false,
      msg: 'Account created but not active',
    })
  }

  const newUser = await User.create({ ...req.body })

  //Generate 20 bit activation code
  crypto.randomBytes(20, function (err, buf) {
    //Activation link
    newUser.activeToken = Date.now() + 24 * 3600 * 1000

    const link = `http://localhost:${process.env.PORT}/api/user/active/${newUser.activeToken}`

    sendMail({
      to: email,
      subject: 'Welcome',
      html:
        'Please click <a href="' + link + '">here</a> to activate your account',
    })

    newUser.save(function (err, user) {
      if (err) return next(err)
      res.status(201).json({
        success: true,
        msg:
          'The activation link has been sent to' +
          newUser.email +
          'please click on the activation link',
      })
    })
  })
}

module.exports = { registerUser }
