const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Teacher = sequelize.define('teacher', {
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
});

const Student = sequelize.define('student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  student_name: {
    type: DataTypes.STRING(50)
  }
});

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

// Define associations between models
Teacher.hasMany(Class, { foreignKey: 'teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Class.belongsToMany(Student, { through: ClassEnrollment, foreignKey: 'class_id' });
Student.belongsToMany(Class, { through: ClassEnrollment, foreignKey: 'student_id' });
