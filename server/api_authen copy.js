const express = require("express");
const router = express.Router();
const {User,Teacher,Student} = require("./models/dataset2");
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const jwt = require("./jwt");
const { json } = require("sequelize");

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let result = await User.findOne({ where: { username: username } });
  const { level, title,firstname , lastname ,email } = result;
  if (result != null) {
    if (bcrypt.compareSync(password, result.password)) {
      const payload = { username };
      const token = jwt.sign(payload);
      res.json({
        result: constants.kResultOk,
        token,
        username,
        level,
        title, 
        firstname , lastname
        ,email
        // , message: JSON.stringify(result),
      });
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect password" });
    }
  } else {
    res.json({ result: constants.kResultNok, message: "Incorrect username" });
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
    } res.json({ result: constants.kResultOk, user: {...profile }});
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Get Profile
router.get("/profile", jwt.verify, async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.username } });
    let profile = {};  
    if (user.level === "teacher") {
      const teacher = await Teacher.findOne({
        attributes: ["teacher_id","teacher_name",'username'],
        include: [{
          model: User,
          attributes: ["username"],
          where: { username: user.username}
        }]
      });
      profile = {
        teacher_id: teacher.teacher_id,
        teacher_name: teacher.teacher_name,
        username:teacher.username
      };
      
    } else if (user.level === "student") {
    console.log(user.username);
    // const student =  await Student.findOne({
    //   attributes: ['student_id', 'student_name','username'],
    //   where: {
    //     student_id: user.username
    //   }
    // });
    const student = await Student.findOne({
      attributes: ["student_id","student_name",'username'],
      include: [{
        model: User,
        attributes: ["username"],
        where: { username: user.username}
      }]
    });
      profile = { 
        student_id: student.student_id, 
        student_name: student.student_name,
        username: student.username
      };

    } else {
      return res.json({
        result: constants.kResultNok,
        message: "Invalid user level",
      });
    }
    const payload = { username: user.username, level: user.level };
    const token = jwt.sign(payload);
    res.json({ result: constants.kResultOk, user: { token, ...profile } });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "User not found" });
  }
});

// Query all users
router.get("/users",jwt.verify, async (req, res) => {
  let result = await User.findAll();
  res.json(result);
});

module.exports = router;
