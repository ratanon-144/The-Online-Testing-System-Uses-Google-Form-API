require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_HOST,
  process.env.PASSWORD_HOST,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);
(async () => {
  await sequelize.authenticate();
})();
module.exports = sequelize;
