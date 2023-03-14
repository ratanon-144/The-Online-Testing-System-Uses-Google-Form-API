module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    course_id: {
      type: Sequelize.STRING,
    },
    course_title: {
      type: Sequelize.STRING,
    },
    descrioion: {
      type: Sequelize.STRING,
    }
    //  users_id, title, fname, lname, sex, email, avatar, createdAt, updatedAt
  });
  return Course;
};
