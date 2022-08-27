const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    minlength: 5,
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.confirmPassword = async function (accessPassword) {
  return await bcrypt.compare(accessPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
