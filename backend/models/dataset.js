const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db_instance");
 
// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('instructor', 'student'),
    allowNull: false
  },fullname: DataTypes.STRING
});

// Define Course model
const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Quiz model
const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Question model
const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Answer model
const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

// Define Course-User association
Course.belongsToMany(User, { through: 'Enrollment' });
User.belongsToMany(Course, { through: 'Enrollment' });

// Define Quiz-Course association
Quiz.belongsTo(Course);
Course.hasMany(Quiz);

// Define Question-Quiz association
Question.belongsTo(Quiz);
Quiz.hasMany(Question);

// Define Answer-Question association
Answer.belongsTo(Question);
Question.hasMany(Answer);

(async () => {
   // await sequelize.drop();
   await sequelize.sync({ force: false });
 })();
 
// Export the defined models
module.exports = { User, Course, Quiz, Question, Answer ,sequelize };



 
