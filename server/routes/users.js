const express = require('express')
const router = express.Router()

const { registerUser, activeToken, loginUser } = require('../controllers/user')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/active/:activeToken').get(activeToken)

module.exports = router
