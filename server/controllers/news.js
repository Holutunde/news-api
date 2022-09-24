const News = require('../models/newsSchema')

const imageToBase64 = require('image-to-base64')

const addNews = async (req, res, next) => {
  // const imgUrl = await uploadImage(req.files)
  const { title, content, url, author, category, imageUrl } = req.body

  //const urlImage = await imageToBase64(req.files.image.path)

  const news = await News.create({
    author,
    title,
    content,
    category,
    url,
    urlToImage: `data:${req.files.image.type};base64`,
    addedAt: Date.now(),
  })

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
    .sort('-addedAt')
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

module.exports = {
  addNews,
  getAllNews,
}
