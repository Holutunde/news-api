const Category = require('../models/categorySchema')

const addCategory = async (req, res) => {
  const { category_name } = req.body
  const category = await Category.findOne({ category_name })

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

const deleteCategory = async (req, res) => {
  const id = req.params.id
  const category = await Category.findByIdAndDelete(id)

  if (!category) {
    return res.status(401).json({
      success: false,
      msg: 'Category not found.',
    })
  }
  res.status(201).json({
    success: true,
    msg: 'Successfully Deleted',
    data: category,
  })
}

const getAllCategories = async (req, res) => {
  const categories = await Category.find({})
  res.json({
    success: true,
    data: categories,
  })
}

const editCategory = async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!category) {
    return res.status(401).json({
      success: false,
      msg: 'Category not found.',
    })
  }
  res
    .status(200)
    .json({ success: true, data: category, msg: 'Successfully updated' })
}

module.exports = {
  addCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
}
