const express = require('express')
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
} = require('../controllers/category')
const auth = require('../../middleware/authentication')
const router = express.Router()

router.route('/addCategory').post(auth, addCategory)
router.route('/deleteCategory/:id').delete(auth, deleteCategory)
router.route('/allCategory').get(getAllCategories)
router.route('/editCategory/:id').put(editCategory)

module.exports = router
