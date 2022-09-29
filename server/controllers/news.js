const News = require('../models/newsSchema')

const imageToBase64 = require('image-to-base64')

const addNews = async (req, res, next) => {
  // const imgUrl = await uploadImage(req.files)
  const { title, content, url, author, category, addedBy } = req.body

  //const urlImage = await imageToBase64(req.files.image.path)

  const news = await News.create({
    author,
    title,
    content,
    category,
    addedBy,
    url,
    urlToImage: `data:${req.files.image.type};base64`,
    addedAt: Date.now(),
  })
  console.log(req.files)
  if (news) {
    res.status(201).json({
      success: true,
      msg: 'Successfully Added News',
      data: news,
    })
  } else {
    res.status(400)
    throw new Error('Invalid News data')
  }

  // console.log(bodyData)
  if (!req.files) {
    res.status(400).send('Select an Image.')
  } else {
  }
}

const getAllNews = async (req, res) => {
  const { pageSize, perPage } = req.params
  let query = {}
  if (pageSize < 0 || pageSize == 0) {
    response = {
      success: false,
      message: 'invalid page number, should start with 1',
    }
    return res.json(response)
  }

  query.skip = perPage * (pageSize - 1)
  query.limit = perPage

  allNews = await News.find({})
    .sort('addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })
    .populate({ path: 'addedBy', select: ['name', 'email'] })
    .sort('-id')
    .limit(Number(query.limit))
    .skip(Number(query.skip))

  // const news = await News.find({}, query).populate({ path: 'category', select: ['_id', 'category_name'] }).populate({ path: 'addedBy', select: ['name', 'email']})
  res.json({
    success: true,
    count: allNews.length,
    limit: Number(query.limit),
    data: allNews,
  })
}

const getNewsById = async (req, res) => {
  console.log(req.params.id)
  const news = await News.findById({ _id: req.params.id })
    .populate({ path: 'category', select: ['_id', 'category_name'] })
    .populate({ path: 'addedBy', select: ['name', 'email'] })
  //.populate({ path: 'comments.user', select: ['name', 'email'] })

  if (news) {
    news.views = news.views + 1
  } else {
    return res.status(401).json({
      success: false,
      msg: 'News not found.',
    })
  }
  await news.save()
  res.json({
    success: true,
    data: news,
  })
}

const getNewsByCategory = async (req, res) => {
  const { pageSize, perPage } = req.params
  let query = {}
  if (pageSize < 0 || pageSize == 0) {
    response = {
      success: false,
      message: 'invalid page number, should start with 1',
    }
    return res.json(response)
  }
  console.log(req.params.id)
  query.skip = perPage * (pageSize - 1)
  query.limit = perPage

  const category = await News.find({ category: req.params.id })
    .sort('-addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })
    .populate({ path: 'addedBy', select: ['name', 'email'] })
    .sort('-id')
    .limit(Number(query.limit))
    .skip(Number(query.skip))

  // const news = await News.find({}, query).populate({ path: 'category', select: ['_id', 'category_name'] }).populate({ path: 'addedBy', select: ['name', 'email']})
  res.json({
    success: true,
    count: category.length,
    limit: Number(query.limit),
    data: category,
  })
}
const getNewsByUser = async (req, res) => {
  const { pageSize, perPage } = req.params
  let query = {}
  if (pageSize < 0 || pageSize == 0) {
    response = {
      success: false,
      message: 'invalid page number, should start with 1',
    }
    return res.json(response)
  }

  query.skip = perPage * (pageSize - 1)
  query.limit = perPage

  const allNewsByUser = await News.find({ addedBy: req.user._id })
    .sort('-addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })
    .populate({ path: 'addedBy', select: ['name', 'email'] })
    .limit(Number(query.limit))
    .skip(Number(query.skip))

  res.json({
    success: true,
    count: allNewsById.length,
    limit: Number(query.limit),
    data: allNewsByUser,
  })
}

const editNews = async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!news) {
    return res.status(401).json({
      success: false,
      msg: 'News not found.',
    })
  }
  res
    .status(200)
    .json({ success: true, data: news, msg: 'Successfully updated' })
}

module.exports = {
  addNews,
  getAllNews,
  getNewsById,
  getNewsByUser,
  editNews,
  getNewsByCategory,
}
