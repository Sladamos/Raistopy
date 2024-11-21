const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, 
      required: true
    },
    login: {
      type: String,
      required: [true, 'Login jest wymagany'],
      unique: true,
      trim: true,
      minlength: [5, 'Login musi mieć przynajmniej 5 znaków']
    },
    favouriteStops: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Stop'
        }
      ],
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;