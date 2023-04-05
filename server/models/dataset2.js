const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../db_instance");
const User = sequelize.define(
  "users",
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    level: {
      type: Sequelize.STRING,
      defaultValue: "normal"
    },
    email: {
      type: Sequelize.STRING, 
      allowNull: false
    } 
  }
);

const Teacher = sequelize.define('teachers', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teacher_name: DataTypes.STRING
});

const Student = sequelize.define('students', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  student_name: DataTypes.STRING
});

const Class = sequelize.define('classes', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },
  class_name: DataTypes.STRING
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



User.hasOne(Teacher, {  foreignKey: 'username', scope: {   level: 'teacher'  }});
Teacher.belongsTo(User, { foreignKey: 'username',scope: {level: 'teacher'}});

User.hasOne(Student, { foreignKey: 'username',scope: {  level: 'student'}});
Student.belongsTo(User, {  foreignKey: 'username', scope: {   level: 'student' }});

Teacher.hasMany(Class, { foreignKey: 'teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Class.belongsToMany(Student, { through: ClassEnrollment, foreignKey: 'class_id' });
Student.belongsToMany(Class, { through: ClassEnrollment, foreignKey: 'student_id' });

(async () => {
    await sequelize.sync({ force: false });
    
  })();
  module.exports = {
    User,
    Teacher,
    Class,
    Student,
    ClassEnrollment,
  };
