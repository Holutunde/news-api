require('dotenv').config()
require('express-async-errors')

const express = require('express')
const formData = require('express-form-data')
const app = express()
const morgan = require('morgan')
const connectDB = require('./database/db')
const notFound = require('./middleware/notFound')

const users = require('./server/routes/users')
const category = require('./server/routes/category')
const news = require('./server/routes/news')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(formData.parse())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', users)
app.use('/api/news', news)
app.use('/api/category', category)
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
