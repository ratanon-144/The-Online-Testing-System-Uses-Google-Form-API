const express = require("express");
const router = express.Router();
const {User,Teacher,Class,Student,ClassEnrollment,} = require("./models/dataset2");
const {Sequelize,QueryTypes } = require("sequelize");
const path = require("path");
const formidable = require("formidable");

// Get Instructor id
router.get("/instructor/:id", async (req, res) => {
  let result = await Teacher.findOne({ where: { teacher_id: req.params.id}});
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});

// Get Instructor all
router.get("/instructor", async (req, res) => {
  let result = await Teacher.findAll({
    order: Sequelize.literal("teacher_id DESC"),
  });
  if (result != null) {
    res.json(result);
  } else {
    res.json({ message: "Notfi" });
  }
});

// Add Instructor
router.post("/instructor", async (req, res) => {
    try{ 
      const {teacher_id,teacher_name} = req.body;
     const checkid = await Teacher.findOne({ where: { teacher_id: teacher_id } });
    if(checkid != null){
      res.json({me:"Nok", message: {checkid}});
    }else{ 
       try {
        const result = Teacher.create({
          teacher_id: teacher_id,
          teacher_name: teacher_name
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

// Update Product
// router.put("/instructor", async (req, res) => {
//   try {
//     var form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       let result = await Teacher.update(fields, { where: { teacher_id: fields.id } });
      
//       res.json({
//         result: constants.kResultOk,
//         message: JSON.stringify(result),
//       });
//     });
//   } catch (err) {
//     res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
//   }
// });

// Delete instructor
router.delete("/instructor/:id", async (req, res) => {
  try { 
    let result = await Teacher.findOne({ where: { teacher_id: req.params.id } }); 
    result = await Teacher.destroy({ where: {teacher_id: req.params.id} });
    res.json({ result: "delete instructor", message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result:"delete", message: "Internal error" });
  }
});

   


module.exports = router;
