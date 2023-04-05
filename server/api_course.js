const express = require("express");
const router = express.Router();
const {User,Teacher,Class,Student,ClassEnrollment,} = require("./models/dataset2");
const {Sequelize,QueryTypes } = require("sequelize");
const formidable = require("formidable");
const path = require("path"); 
const Op = Sequelize.Op;
const jwt = require("./jwt");

//classes อาจารย์สร้าง class 
router.post("/classes", async (req, res) => {
  try{ 
    const {class_id,class_name,teacher_id} = req.body;
   const checkid = await Class.findOne({ where: { class_id: class_id } });
  if(checkid != null){
    res.json({me:"Nok", message: JSON.stringify(checkid)});
  }else{ 
     try {
      const result = Class.create({
        class_id: class_id,
        class_name: class_name,
        teacher_id:teacher_id
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

/// add ClassEnrollment เพื่มนักศึกษาเข้าไปไหน class
router.post("/classenrollment", async (req, res) => {
  try{ 
    const {class_id,student_id} = req.body;
   const checkid = await ClassEnrollment.findOne({ where: { class_id: class_id } });
  if(checkid != null){
    res.json({me:"Nok", message: JSON.stringify(checkid)});
  }else{ 
     try {
      const result = ClassEnrollment.create({
        class_id: class_id,
        student_id: student_id
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
/// add ClassEnrollment เพื่มนักศึกษาเข้าไปไหน class arry limit 3 use
router.post("/classenrollments", async (req, res) => {
  try{ 
    const {classes} = req.body;
    if(classes == null){
     res.json({me:"Nok", message: JSON.stringify("not classes type arry ")});
  }else{ 
     try {
      const result = ClassEnrollment.bulkCreate(classes);
      res.json({result});
    } catch (error) {
      res.json({ message: JSON.stringify(error) });
    }
  //  res.json("OK")
  }
  }catch{
    res.json("eer")
  } 
});
// Get course id
router.get("/instructor/:id", async (req, res) => {
  let result = await Teacher.findOne({ where: { teacher_id: req.params.id}});
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});
// Get course all
router.get("/course", async (req, res) => {
  try {
    const results = await Class.findAll({
      include: { model: ClassEnrollment, required: true },
      include: { model: Student, required: true },
    });

    console.log(results);
    if (results != null) {
      res.json(results);
    } else {
      res.json({ message: "Notfi" });
    }
  } catch (error) {
    res.json({  message: "notfil" });
  }
});

// แสดงรายชื่อนักศึกษาที่อยู่ใน class
router.get("/courses/:id", async (req, res) => {
  try { 
    const results = await Class.findAll({
      attributes: ['class_name'],
      include: [
        {
          model: Student,
          attributes: ['student_id', 'student_name'],
          through: {
            attributes: []
          }
        }
      ],
      where: {
        teacher_id: req.params.id
      }
    });
    if (results != null) {
      res.json(results);
    } else {
      res.json({ message: "Notfi" });
    }
  } catch (error) {
    res.json({  message: "notfil" });
  }
});

// แสดงรายชื่ออาจารย์ที่อยู่ใน class
router.get("/coursei/:id", async (req, res) => {
  try {
    const results = await Class.findAll({
      attributes: ['class_name'],
      include: [
        {
          model: Teacher,
          attributes: ['teacher_name']
        },
        {
          model: Student,
          attributes: [],
          where: {
            student_id: req.params.id
          }
        }
      ]
    });
    
    if (results != null) {
      res.json(results);
    } else {
      res.json({ message: "Notfi" });
    }
  } catch (error) {
    res.json({  message: "notfil" });
  }
});


// แสดงรายการ class ที่อาจารย์ สอนอยู่
router.get("/coursel/:id", async (req, res) => {
  try {
    const results = await Class.findAll({
      where: { teacher_id: req.params.id },
      include: Teacher
    });
    
    if (results != null) {
      res.json(results);
    } else {
      res.json({ message: "Notfi" });
    }
  } catch (error) {
    res.json({  message: "notfil" });
  }
});
 

module.exports = router;
