const express = require("express");
const router = express.Router();
const { User, Teacher, Student } = require("./models/dataset2");
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const jwt = require("./jwt");
const { json } = require("sequelize");

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    let profile = {};
    if (user != null) {
      if (bcrypt.compareSync(password, user.password)) {
        //const payload =;
        const token = jwt.sign( { username, level:user.level});
        if (user.level === "teacher") {
          const teacher = await Teacher.findOne({
            attributes: ["teacher_id", "teacher_name", 'username'],
            include: [{ model: User,  attributes: ["username"], 
            where: { username: user.username } }] });
          profile = {
            result: constants.kResultOk,
            token: token,
            id: teacher.teacher_id,
            username: user.username,
            level: user.level,
            email: user.email,
            fullname: teacher.teacher_name,
          }
        } else if (user.level === "student") {
          const student = await Student.findOne({
            attributes: ["student_id", "student_name", 'username'],
            include: [{
              model: User,
              attributes: ["username"],
              where: { username: user.username }
            }]
          });
          profile = {
            result: constants.kResultOk,
            token: token,
            id: student.student_id,
            username: user.username,
            level: user.level,
            email: user.email,
            fullname: student.student_name,
          }
        } else {
          return res.json({result: constants.kResultNok, message: "Invalid user level", });
        }
      }
      else {
        res.json({ result: constants.kResultNok, message: "Incorrect password" });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect username" });
    }
    res.json({ ...profile });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "User not found" });
  }
});


// Register
router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const fullname = `${req.body.title} ${req.body.firstname} ${req.body.lastname}`;
    let user = await User.create(req.body);
    let profile = {};
    if (req.body.level === "teacher") {
      const teacher = await Teacher.create({
        teacher_id: null,
        teacher_name: fullname,
        username: user.username
      });
      profile = {
        teacher_id: teacher.teacher_id,
        teacher_name: teacher.teacher_name,
        username: teacher.username,
        message: "Teacher created successfully"
      };
    } else if (req.body.level === "student") {
      const student = await Student.create({
        student_id: req.body.username,
        student_name: fullname,
        username: user.username
      });
      profile = {
        student_id: student.student_id,
        student_name: student.student_name,
        username: student.username,
        message: "Student created successfully"
      };

    } else {
      res.json({ result: constants.kResultNok, message: "Invalid user level" });
    } res.json({ result: constants.kResultOk, user: { ...profile } });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Get Profile
router.get("/profile", jwt.verify, async (req, res) => {
  try {

    const user = await User.findOne({ where: { username: req.username } });
    let profile = {};
    const payload = { username: user.username, level: user.level };
    const token = jwt.sign(payload);
    if (user.level === "teacher") {
      const teacher = await Teacher.findOne({
        attributes: ["teacher_id", "teacher_name", 'username'],
        include: [{
          model: User,
          attributes: ["username"],
          where: { username: user.username }
        }]
      });
     profile = { 
       token: token,
       id: teacher.teacher_id,
       username: user.username,
       level: user.level,
       email: user.email,
       fullname: teacher.teacher_name,
     }; 

    } else if (user.level === "student") {
      const student = await Student.findOne({
        attributes: ["student_id", "student_name", 'username'],
        include: [{
          model: User,
          attributes: ["username"],
          where: { username: user.username }
        }]
      });
      profile = { 
        token: token,
        id: student.student_id,
        username: token.username,
        level: user.level,
        email: user.email,
        fullname: student.student_name,
      }; 
    } else {
      return res.json({ result: constants.kResultNok,  message: "Invalid user level", });
     }
    res.json({  result: "ok", user: {...profile } });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "User not found" });
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
