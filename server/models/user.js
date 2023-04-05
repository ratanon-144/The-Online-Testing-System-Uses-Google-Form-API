const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../db_instance");

 // Define User and Order models
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
  });
  
  const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER }
  });
  // Define association between User and Order models
  User.hasMany(Order);
  Order.belongsTo(User);

(async () => {
    await sequelize.sync({ force: false });
  })();

  module.exports = {
    User,
    Order
  };
