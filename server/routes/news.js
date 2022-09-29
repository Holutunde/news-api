const express = require('express')
const router = express.Router()
const {
  addNews,
  getAllNews,
  getNewsById,
  getNewsByUser,
  editNews,
  getNewsByCategory,
} = require('../controllers/news')

const authentication = require('../../middleware/authentication')

router.route('/').post(addNews)
router.route('/getByNewsId/:id').get(getNewsById)
router.route('/getAllNews/:pageSize/:perPage').get(getAllNews)
router
  .route('/getNewsByUserId/:pageSize/:perPage')
  .get(authentication, getNewsByUser)
router.route('/getNewsByCategory/:id/:pageSize/:perPage').get(getNewsByCategory)
router.route('/editNews/:id').patch(editNews)
module.exports = router
