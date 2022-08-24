const express = require('express')
const router = express.Router()

const { registerUser, activeToken } = require('../controllers/user')

router.route('/').post(registerUser)
router.route('/active/:activeToken').get(activeToken)

module.exports = router
