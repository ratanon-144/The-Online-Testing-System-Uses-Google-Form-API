module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    users_id: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    fname: {
      type: Sequelize.STRING,
    },
    lname: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
    }
    //  users_id, title, fname, lname, sex, email, avatar, createdAt, updatedAt
  });
  return Account;
};
