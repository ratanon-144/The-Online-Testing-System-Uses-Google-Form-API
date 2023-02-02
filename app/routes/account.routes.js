module.exports = app => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // Create a new account
  router.post("/", accounts.create);

  // Retrieve all accounts
  router.get("/", accounts.findAll);

  // Retrieve a single account with id
  router.get("/:id", accounts.findOne);

  // Update a account with id
  router.put("/:id", accounts.update);

  // Delete a account with id
  router.delete("/:id", accounts.delete);

  // Delete all accounts
  router.delete("/", accounts.deleteAll);

  app.use('/api/accounts', router);
};
