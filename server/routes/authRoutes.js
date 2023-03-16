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
    return res.status(422).json({error: "Please add all the fields1"});
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

                                  const { _id, email } = savedUser;

                                  res.json({ message: "Successfully Signed In", token, user: { _id, email } });
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

router.post('/userdata', (req, res) => {
  const { authorization } = req.headers;
  console.log('author ', authorization);
  if (!authorization) {
      return res.status(401).json({ error: "You must be logged in, token not given" });
  }
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
          return res.status(401).json({ error: "You must be logged in, token invalid" });
      }
      const { _id } = payload;
      User.findById(_id).then(userdata => {
          res.status(200).send({
              message: "User Found",
              user: userdata
          });
      })

  })
})


router.post('/setprofilepic', (req, res) => {
  const { email, profilepic } = req.body;


  // console.log("email: ", email);
  User.findOne({ email: email })
      .then((savedUser) => {
          if (!savedUser) {
              return res.status(422).json({ error: "Invalid Credentials" })
          }
          savedUser.profilepic = profilepic;
          savedUser.save()
              .then(user => {
                  res.json({ message: "Profile picture updated successfully" })
              })
              .catch(err => {
                  console.log(err);
              })
      })
      .catch(err => {
          console.log(err);
      })
})


module.exports = router;