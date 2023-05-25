const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/dataset");
const { Sequelize, QueryTypes, json } = require("sequelize");
const path = require("path");
const Op = Sequelize.Op;
const jwt = require("../jwt");
// Login 
router.post('/login', async (req, res) => {
  try {
    let profile = {};
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });// Custom method for finding user by email and password
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username, level: user.level });
      profile = {
        result: "ok",
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
      email: req.body.email,
      password: req.body.password,
      level: req.body.level,
      fullname: fullname
    });
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get user profile
router.get('/profile', jwt.verify, async (req, res) => {
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
    res.status(200).json({ result: "ok", user: { ...profile } });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
// Query all users
router.get("/users", jwt.verify, async (req, res) => {
  try {
    let result = await User.findAll({
      attributes: ['id',
      'username',
      'email',
      'level',
      'fullname']
    });
    res.json(result);
  } catch (error) {
    res.json({ result: "nok" , message: "User not found" });
  }
});

router.get("/dropall", async (req, res) => {
  try {
    // await Sequelize.drop();
    await sequelize.drop();
    res.status(200).json({ message: "All tables dropped successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while dropping tables" });
  }
});

router.get("/creattable", async (req, res) => {
  try {
    // await Sequelize.drop();
    await sequelize.sync({ force: true });
    res.status(200).json({ message: "All tables creattable successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creattable tables" });
  }
});

module.exports = router;
