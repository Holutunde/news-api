const express = require('express')
const router = express.Router()
const { addNews, getAllNews } = require('../controllers/news')

const authentication = require('../../middleware/authentication')

router.route('/').post(authentication, addNews)
router.route('/getAllNews/:pageSize/:perPage').get(getAllNews)

module.exports = router
