const express = require("express");
const router = express.Router();
const course = require("./models/course");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;
const jwt = require("./jwt");
// Get Course
router.get("/course", jwt.verify, async (req, res) => {
  let result = await course.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

// Add Product
router.post("/course", jwt.verify, async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields) => {
      let result = await course.create(fields);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Update Course 
router.put("/course", jwt.verify, async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
      let result = await course.update(fields, { where: { id: fields.id } });
       res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (err) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
});

// Delete Course
router.delete("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await product.findOne({ where: { id: id } });
    await fs.remove(
      path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
    );
    result = await product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
});

// Get Course by Id
router.get("/course/:id", async (req, res) => {
  let result = await course.findOne({ where: { id: req.params.id } });
  if (result) {
    res.json(result);
  } else {
    res.json({});
  }
});

// Get Course by Keyword
router.get("/course/keyword/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let result = await course.findAll({
    where: { name: { [Op.like]: `%${keyword}%` } },
  });
  res.json(result);
});

module.exports = router;
