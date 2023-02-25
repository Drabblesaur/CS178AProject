const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");

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
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({message: "User Registered Successfully", token});
      }
      catch (err) {
        console.log(err);
        return res.status(422).json({error: "User not Registered" });
      }
    

    
  }
  

  
})


router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
  }
  else {
      User.findOne({ email: email })
          .then(savedUser => {
              if (!savedUser) {
                  return res.status(422).json({ error: "Invalid Credentials" });
              }
              else {
                  console.log(savedUser);
                  bcrypt.compare(password, savedUser.password)
                      .then(
                          doMatch => {
                              if (doMatch) {
                                  const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

                                  const { _id, username, email } = savedUser;

                                  res.json({ message: "Successfully Signed In", token, user: { _id, username, email } });
                              }
                              else {
                                  return res.status(422).json({ error: "Invalid Credentials" });
                              }
                          }
                      )
                  // res.status(200).json({ message: "User Logged In Successfully", savedUser });
              }
          })
          .catch(err => {
              console.log(err);
          })
  }
})

module.exports = router;