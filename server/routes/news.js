const express = require('express')
const router = express.Router()
const {
  addNews,
  getAllNews,
  getNewsId,
  getNewsByUser,
} = require('../controllers/news')

const authentication = require('../../middleware/authentication')

router.route('/').post(addNews)
router.route('/getById/:newsId').get(getNewsId)
router.route('/getAllNews/:pageSize/:perPage').get(getAllNews)
router
  .route('/getNewsById/:pageSize/:perPage')
  .get(authentication, getNewsByUser)

module.exports = router
