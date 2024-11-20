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
    favoriteStops: {
      type: [String],
      default: [],
      validate: {
        validator: function(arr) {
          return arr.every(stopId => typeof stopId === 'string');
        },
        message: 'Co najmniej jeden przystanek jest niepoprawny'
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;