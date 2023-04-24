const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User }  = require("./models/dataset");
const {Sequelize,QueryTypes, json } = require("sequelize");
const path = require("path"); 
const Op = Sequelize.Op;
const jwt = require("./jwt");
const constants = require("./constant");

// Login 
router.post('/login', async (req, res) => {
  try {
    let  profile ={};
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });// Custom method for finding user by email and password
    if (bcrypt.compareSync(password, user.password)){
      
    const token = jwt.sign( { username, level:user.level});
    
    profile = {
      result: constants.kResultOk,
      token: token,
      id: user.id,
      username: user.username,
      level: user.level,
      email: user.email,
      fullname: user.fullname,
    }
 
  }
    res.status(200).json({ ...profile });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

 // Register a new user
router.post('/register', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const fullname = `${req.body.title} ${req.body.firstname} ${req.body.lastname}`;
    let user = await User.create({
      username: req.body.username,
      email : req.body.email,
      password :req.body.password,
      level : req.body.level,
      fullname:fullname
    });  
    res.status(201).json({ message: 'User registered successfully', user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 
// Get user profile
router.get('/profile',jwt.verify, async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.username } });
    let profile = {};
    const payload = { username: user.username, level: user.level };
    const token = jwt.sign(payload);
    profile = { 
      token: token,
      id: user.id,
      username: user.username,
      level: user.level,
      email: user.email,
      fullname: user.fullname,
    }
    res.status(200).json({  result: "ok", user: {...profile } });
       } catch (error) {
    res.status(401).json({ message: error.message });
  }
}); 
// Query all users
router.get("/users", jwt.verify, async (req, res) => {
  try {
    let result = await User.findAll();
    res.json(result);
     } catch (error) {
    res.json({ result: constants.kResultNok, message: "User not found" });
  }
});

module.exports = router;
