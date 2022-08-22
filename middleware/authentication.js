const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    res.status(401).json('authentication error')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { id } = payload
    req.user = { id }
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      success: false,
      msg: 'Session Expired',
    })
  }

  if (!token) {
    res.status(401).json({
      success: false,
      msg: 'Token not authorized',
    })
  }
}

module.exports = auth
