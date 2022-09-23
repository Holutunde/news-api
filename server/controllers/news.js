const News = require('../models/newsSchema')

const imageToBase64 = require('image-to-base64')

const addNews = async (req, res, next) => {
  // const imgUrl = await uploadImage(req.files)
  const { title, content, url, author, category, imageUrl } = req.body
  // console.log("req.body", req.body);
  // console.log("req.files.images", req.files.image);
  let urlImage = ''
  if (imageUrl == '') urlImage = await imageToBase64(req.files.image.path)

  console.log('urlImage', urlImage)

  const news = await News.create({
    author,
    title,
    content,
    category,
    url,
    urlToImage:
      imageUrl !== ''
        ? imageUrl
        : `data:${req.files.image.type};base64,` + urlImage,
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

module.exports = {
  addNews,
}
