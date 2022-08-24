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
  crypto.randomBytes(20, function (err, buff) {
    //Activation link
    newUser.activeToken = newUser._id

    console.log(newUser._id)

    //Expiration to 24 hours
    newUser.activeExpires = Date.now() + 24 * 3600 * 1000

    const link = `http://localhost:${process.env.PORT}/api/users/active/${newUser.activeToken}`

    sendMail.send({
      to: newUser.email,
      subject: 'Welcome',
      html:
        'Please click <a href="' + link + '">here</a> to activate your account',
    })
    console.log(newUser)
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

const activeToken = async (req, res) => {
  //find corresponding user
  User.findOne(
    {
      activeToken: req.params.activeToken,
      // activeExpires: { gt: Date.now() },
    },
    function (err, user) {
      if (err) {
        console.log('no active token')
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          msg: 'your activation link is invalid ',
        })
      }
      if (user.active == true) {
        return res.status(200).json({
          success: true,
          msg:
            'Yoir account is already activated, kindly go and login to use the app',
        })
      }

      //if user is not activated
      user.active = true
      user.save(function (err, user) {
        if (err) {
          console.log('no active token')
        }
        //activation successful
        res.status(200).json({
          success: true,
          msg: 'Activation success',
        })
      })
    },
  )
}

module.exports = { registerUser, activeToken }
