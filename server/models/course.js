const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db_instance");
const course = sequelize.define(
  'teacher', {
    teacher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    teacher_name: {
      type: DataTypes.STRING(50)
    }
  });
  
  const Class = sequelize.define('class', {
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    class_name: {
      type: DataTypes.STRING(50)
    }
  },
  {
    // options
  }
);

(async () => {
  await course.sync({ force: false });
})();

module.exports = course;

