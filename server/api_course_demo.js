const express = require("express");
const router = express.Router();
const {Teacher,Class,Student,ClassEnrollment,} = require("./models/dataset_mode");
const {Sequelize,QueryTypes } = require("sequelize");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;
const jwt = require("./jwt");

// Get course
router.get("/", async (req, res) => {
  const studentsData = [
    { id: 63015086, name: 'นาย ธีรนัย ศิลารักษ์' },
    { id: 63015091, name: 'นาย นนทพัทธ์ หนองคาย์' },
    { id: 63015097, name: 'นาย นวัต การสำเริง' },
    { id: 63015101, name: 'นางสาว นิรมล อัศวสัย' },
    { id: 63015098, name: 'นางสาว นันฑิกาณต์ แพร่ศิริรักษ์' },
    { id: 63015108, name: 'นาย ปริทัศน์ วิลัยขำ' },
    { id: 63015117, name: 'นาย พชรพล พรมแพง' },
    { id: 63015121, name: 'นาย พศิน จันทรทัน' },
    { id: 63015123, name: 'นาย พันธวัช ตันอนุกูล' }
  ];
  
  const requestBody = { students: studentsData };
  const requestBodyJson = JSON.stringify(requestBody);
  res.json(requestBody);
});

// Get course
router.get("/teacher", async (req, res) => {
  let result = await Teacher.findAll({
    order: Sequelize.literal("teacher_id DESC"),
  });
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});

// Add T
router.post("/teacher", async (req, res) => {
    try{ 
      const {teacherid,teachername} = req.body;
     const checkid = await Teacher.findOne({ where: { teacher_id: teacherid } });
    if(checkid != null){
      res.json({me:"Nok", message: JSON.stringify(checkid)});
    }else{ 
       try {
        const result = Teacher.create({
          teacher_id: teacherid,
          teacher_name: teachername
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
//student_id เพิ่มรายชื่อนักศักษา
router.post("/student", async (req, res) => {
  try{ 
    const {student_id,student_name} = req.body;
   const checkid = await Student.findOne({ where: { student_id: student_id } });
  if(checkid != null){
    res.json({me:"Nok", message: JSON.stringify(checkid)});
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

//student_id เพิ่มรายชื่อนักศักษา
router.post("/students", async (req, res) => {
  try{ 
    const {students,student_id,student_name} = req.body;
  //  const checkid = await Student.findOne({ where: { student_id: student_id } });
   if(students == null){
   
     res.json({me:"Nok", message: JSON.stringify("not students type arry ")});
  }else{ 
     try {
      const result = Student.bulkCreate(students);
      res.json({result});
    } catch (error) {
      res.json({ message: JSON.stringify(error) });
    }
    //res.json("students nok")
  }
 // res.json(req.body)
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
    const {classes,class_id,student_id} = req.body;
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


router.get("/student", async (req, res) => {
  let result = await Student.findAll({
    order: Sequelize.literal("student_id DESC"),
  });
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});

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
router.get("/course/:id", async (req, res) => {
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

// แสดงรายชื่อนักศึกษาที่อยู่ใน class
router.get("/courset/:id", async (req, res) => {
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


module.exports = router;
