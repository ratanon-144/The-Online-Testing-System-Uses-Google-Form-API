const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('databaseV5', '63015144', '63015144@kmitl', {
  host: '51.79.251.237',
  dialect: 'mysql' , /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  logging: true,
});

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite",
//   logging: true,
// });

(async () => {
  await sequelize.authenticate();
})();
console.log("DataBase Ac")
module.exports = sequelize;

