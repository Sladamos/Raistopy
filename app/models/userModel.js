const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, 'Login jest wymagany'],
      unique: true,
      trim: true,
      minlength: [10, 'Login musi mieć przynajmniej 10 znaków']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;