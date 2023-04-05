const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../db_instance");
 
// Define the Teacher model
const Teacher = sequelize.define('teachers', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  teacher_name: DataTypes.STRING
});

// Define the Class model
const Class = sequelize.define('classes', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  class_name: DataTypes.STRING
});

// Define the Student model
const Student = sequelize.define('students', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  student_name: DataTypes.STRING
});

// Define the ClassEnrollment model
const ClassEnrollment = sequelize.define('class_enrollment', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
});

// Define the associations between models
Teacher.hasMany(Class, { foreignKey: 'teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Class.belongsToMany(Student, { through: ClassEnrollment, foreignKey: 'class_id' });
Student.belongsToMany(Class, { through: ClassEnrollment, foreignKey: 'student_id' });


(async () => {
    await sequelize.sync({ force: false });
    
  })();
  module.exports = {
    Teacher,
    Class,
    Student,
    ClassEnrollment,
  };
