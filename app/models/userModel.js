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
      type: [
        {
          type: mongoose.Schema.Types.Mixed
        }
      ],
      default: [],
      validate: {
        validator: function(arr) {
          return arr.every(item => typeof item === 'object' && !Array.isArray(item));
        },
        message: 'Co najmniej jeden element jest niepoprawny (musi być obiektem).'
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;