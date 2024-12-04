// models/restaurant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const University = require('./university');

const Restaurant = sequelize.define(
  'restaurant',
  {
    res_restaurantid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'res_restaurantid',
    },
    res_universityid: {
      type: DataTypes.INTEGER,
      field: 'res_universityid',
    },
    res_menu: {
      type: DataTypes.TEXT,
      field: 'res_menu',
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'latitude',
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'longitude',
    },
    res_price_range: {
      type: DataTypes.ENUM('$', '$$', '$$$', '$$$$'),
      field: 'res_price_range',
    },
    res_cuisine: {
      type: DataTypes.TEXT,
      field: 'res_cuisine',
    },
    res_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'res_name',
    },
  },
  {
    tableName: 'restaurant',
    timestamps: false,
    freezeTableName: true,
  }
);

// Define associations
Restaurant.belongsTo(University, {
  foreignKey: 'res_universityid',
  targetKey: 'uni_universityid',
});

module.exports = Restaurant;
