const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activeToken: String,
  activeExpires: Date,
  avatar: {
    type: 'string',
    default: '',
  },
})

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)
