const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    default: '',
    // required: true
  },
  favorites: [{
    building: String,
  }],
  classes: [{
    building: String,
    room: String,
    name: String
  }]
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
      return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  next();
})
mongoose.model("User", userSchema);