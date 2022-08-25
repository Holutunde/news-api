const express = require('express')
const router = express.Router()

const {
  registerUser,
  activeToken,
  loginUser,
  userProfile,
  updateUserProfile,
} = require('../controllers/user')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(userProfile).patch(updateUserProfile)
router.route('/active/:activeToken').get(activeToken)

module.exports = router
