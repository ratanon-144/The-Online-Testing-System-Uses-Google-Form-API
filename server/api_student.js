const express = require("express");
const router = express.Router();
const {Teacher,Class,Student,ClassEnrollment,} = require("./models/dataset2");
const {Sequelize,QueryTypes } = require("sequelize");
const path = require("path");

// เพิ่มรายชื่อนักศักษา id student 
router.post("/student", async (req, res) => {
  try{ 
    const {student_id,student_name} = req.body;
   const checkid = await Student.findOne({ where: { student_id: student_id } });
  if(checkid != null){
    res.json({me:"Nok", message: {checkid}});
  }else{ 
     try {
      const result = Student.create({
        student_id: student_id,
        student_name: student_name
      });
      res.json({result});
    } catch (error) {
      res.json({ message: JSON.stringify(error) });
    }
  }
  }catch{
    res.json("eer")
  } 
});

//เพิ่มรายชื่อนักศักษา student arry 
router.post("/students", async (req, res) => {
  try{ 
    const {students} = req.body;
  if(students == null){
   
     res.json({me:"Nok", message: JSON.stringify("not students type arry ")});
  }else{ 
     try {
      const result = Student.bulkCreate(students);
      res.json({result});
    } catch (error) {
      res.json({ message: JSON.stringify(error) });
    }
   
  }
 
  }catch{
    res.json("eer")
  } 
});
// แสดงรายชื่อทังหมด student all
router.get("/students", async (req, res) => {
  let result = await Student.findAll({
    order: Sequelize.literal("student_id DESC"),
  });
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});

// แสดงรายชื่อ id student
router.get("/student/:id", async (req, res) => { 
    let result = await Student.findOne({
        where: {
          student_id: req.params.id
        }
      });
    if (result != null) {
      res.json(result);
    } else {
      res.json({ message: "Notfi" });
    }
  });

// Delete instructor
router.delete("/student/:id", async (req, res) => {
  try { 
    let result = await Student.findOne({ where: { student_id: req.params.id } }); 
    result = await Student.destroy({ where: {student_id: req.params.id} });
    res.json({ result: "delete student ", message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result:"delete", message: "Internal error" });
  }
});

   


module.exports = router;
