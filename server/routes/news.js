const express = require('express')
const router = express.Router()
const { addNews } = require('../controllers/news')

const protect = require('../../middleware/authentication')

router.route('/').post(addNews)

module.exports = router
