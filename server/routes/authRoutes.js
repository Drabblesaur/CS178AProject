const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");
const Feature = require('../models/Feature');
const { MongoClient } = require('mongodb');

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

                                  const { _id, email, profilepic, classes, favorites } = savedUser;

                                  res.json({ message: "Successfully Signed In", token, user: { _id, email, profilepic,classes, favorites  } });
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

router.post('/addClasses', (req, res) => {
  const { email, building, room, name } = req.body;


  // console.log("email: ", email);
  User.findOne({ email: email })
      .then((savedUser) => {
          if (!savedUser) {
              return res.status(422).json({ error: "Invalid Credentials" })
          }
          const newClass = { building, room, name };
          savedUser.classes.push(newClass);
          savedUser.save()
              .then(user => {
                  res.json({ message: "class added succesfully" })
                  const { _id } = payload;
                  User.findById(_id).then(userdata => {
                  res.status(200).send({
                  message: "User Found",
                  user: userdata
          });
      })
                  
              })
              .catch(err => {
                  console.log(err);
              })
      })
      .catch(err => {
          console.log(err);
      })
})

//router.get('/firstfloordata/:buildingname', (req, res) => {
router.get('/buildingData', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('buildings');

        // Define the query object
        const query = {};

        // Check if a limit parameter was provided
        if (req.query.limit) {
            const limitNumber = parseInt(req.query.limit, 10);
        if (isNaN(limitNumber)) {
            return res.status(400).json({ message: 'Invalid limit parameter' });
        }
        // Add the limit to the query object
        query.limit = limitNumber;
        }
       

        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        if (req.query.limit) {
            collection.find().limit(query.limit).toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        else {
            collection.find().toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        
        });
                  
 });

 router.get('/buildingData/:buildingName', (req, res) => {
    let buildingName = req.params.buildingName;
    buildingName = `.*${buildingName}.*`;
  
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err;
  
      // Get a reference to the database
      const db = client.db('test');
      const collection = db.collection('buildings');
      collection.find({ "properties.building": { $regex: new RegExp(buildingName, 'i') } }).toArray((err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  
        // Return the building data as a JSON response
        res.json(result);
      });
    });
  });

 router.get('/buildingFirstdata', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('buildingFirstFloors');
        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        collection.find().toArray((err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
      
            // Return the building data as a JSON response
            res.json(result);
            
          });
        });
                  
 });

 router.get('/buildingSecondData', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('buildingSecondFloors');
        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        collection.find().toArray((err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
      
            // Return the building data as a JSON response
            res.json(result);
            
          });
        });
                  
 });


 router.get('/buildingThirdData', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('buildingThirdFloor');
        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        collection.find().toArray((err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
      
            // Return the building data as a JSON response
            res.json(result);
            
          });
        });
                  
 });

 router.get('/parkingData/:parkingName', (req, res) => {
    let parkingName = req.params.parkingName;
    parkingName = `.*${parkingName}.*`;
  
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err;
  
      // Get a reference to the database
      const db = client.db('test');
      const collection = db.collection('parking');
      collection.find({ "properties.name": { $regex: new RegExp(parkingName, 'i') } }).toArray((err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  
        // Return the parking building data as a JSON response
        res.json(result);
      });
    });
  });

 router.get('/parkingData', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('parking');
        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        const query = {};
        // Check if a limit parameter was provided
        if (req.query.limit) {
            const limitNumber = parseInt(req.query.limit, 10);
        if (isNaN(limitNumber)) {
            return res.status(400).json({ message: 'Invalid limit parameter' });
        }
        // Add the limit to the query object
        query.limit = limitNumber;
        }
        

        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        if (req.query.limit) {
            collection.find().limit(query.limit).toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        else {
            collection.find().toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        
        });
                  
 });

 router.get('/socialData/:socialName', (req, res) => {
    let socialName = req.params.socialName;
    socialName = `.*${socialName}.*`;
  
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err;
  
      // Get a reference to the database
      const db = client.db('test');
      const collection = db.collection('social');
      collection.find({ "properties.building": { $regex: new RegExp(socialName, 'i') } }).toArray((err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  
        // Return the social building data as a JSON response
        res.json(result);
      });
    });
  });

 router.get('/socialData', (req, res) => {
    //const buildingName = req.params.buildingname;
    //const {building , room} = req.body;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
      
        // Get a reference to the database
        const db = client.db('test')
        const collection = db.collection('social');
        const query = {};

        // Check if a limit parameter was provided
        if (req.query.limit) {
            const limitNumber = parseInt(req.query.limit, 10);
        if (isNaN(limitNumber)) {
            return res.status(400).json({ message: 'Invalid limit parameter' });
        }
        // Add the limit to the query object
        query.limit = limitNumber;
        }
       

        //collection.find({ "properties.building": buildingName }).toArray((err, result) => {
        if (req.query.limit) {
            collection.find().limit(query.limit).toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        else {
            collection.find().toArray((err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
          
                // Return the building data as a JSON response
                res.json(result);
                
              });
        }
        
        });
                  
 });

  
    // console.log("email: ", email);
    

  





module.exports = router;