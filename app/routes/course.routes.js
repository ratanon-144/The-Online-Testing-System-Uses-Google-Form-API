module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new account
  router.post("/", courses.create);

  // Retrieve all accounts
  router.get("/", courses.findAll);

  // Retrieve a single account with id
  router.get("/:id", courses.findOne);

  // Update a account with id
  router.put("/:id", courses.update);

  // Delete a account with id
  router.delete("/:id", courses.delete);

  // Delete all accounts
  router.delete("/", courses.deleteAll);

  app.use('/api/courses', router);
};
