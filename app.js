require('dotenv').config()
require('express-async-errors')

const express = require('express')

const connectDB = require('./database/db')

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
