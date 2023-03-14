const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;

// Create and Save a new account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a account
  const course = {
    course_id: req.body.course_id,
    course_title: req.body.course_title,
    descrioion: req.body.descrioion,
     
  };

  // Save account in the database
 // Save Tutorial in the database
 Course.create(course)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while creating the account."
   });
 });
};


// Retrieve all accounts from the database.
exports.findAll = (req, res) => {
  const course_id = req.query.course_id;
  var condition = course_id ? { course_id: { [Op.like]: `%${course_id}%` } } : null;
  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts."
      });
    });
};

// Find a single account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find account with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving account with id=" + id
      });
    });
};

// Update a account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "account was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update account with id=${id}. Maybe account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating account with id=" + id
      });
    });
};

// Delete a account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "account was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete account with id=${id}. Maybe account was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete account with id=" + id
      });
    });
};

// Delete all accounts from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} accounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accounts."
      });
    });
};


