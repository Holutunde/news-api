const Category = require('../models/categorySchema')

const addCategory = async (req, res) => {
  const { name } = req.body
  const category = await Category.findOne({ category_name: name })

  if (category) {
    return res.status(401).json({
      success: false,
      msg: 'Category already added',
    })
  }

  const new_cat = await Category.create({ category_name })

  res.status(201).json({
    success: true,
    msg: 'Category created',
    data: new_cat,
  })
}

module.exports = {
  addCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
}
