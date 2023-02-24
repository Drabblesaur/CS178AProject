const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
require('dotenv').config();

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).json({error: "Please add all the fields"});
  }
  else {
    const user = new User({
      email,
      password,
    })

    try {
      await user.save();
      return res.status(200).json({message: "User Registered Successfully"});
    }
    catch (err) {
      console.log(err);
  
    }
  }
  

  
})

module.exports = router;