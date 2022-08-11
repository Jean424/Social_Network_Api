const { Schema, model } = require('mongoose');
const moment = require('moment');
// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [{
      type: Schema.Types.ObjectID,
      ref: 'Thought'
  }],
    friends: [{
      type: Schema.Types.ObjectID,
      ref: 'User'
  }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
