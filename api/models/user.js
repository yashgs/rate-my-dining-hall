// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const University = require('./university');

const User = sequelize.define(
  'users',
  {
    user_userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_userid',
    },
    user_universityid: {
      type: DataTypes.INTEGER,
      field: 'user_universityid',
    },
    user_proximity_preference: {
      type: DataTypes.INTEGER,
      field: 'user_proximity_preference',
    },
    user_price_range: {
      type: DataTypes.ENUM('$', '$$', '$$$', '$$$$'),
      field: 'user_price_range',
    },
    user_cuisine_preference: {
      type: DataTypes.TEXT,
      field: 'user_cuisine_preference',
    },
    user_dietary_restriction: {
      type: DataTypes.TEXT,
      field: 'user_dietary_restriction',
    },
    user_email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      field: 'user_email',
    },
    user_last_name: {
      type: DataTypes.STRING(100),
      field: 'user_last_name',
    },
    user_first_name: {
      type: DataTypes.STRING(100),
      field: 'user_first_name',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
  }
);

// Define associations
User.belongsTo(University, {
  foreignKey: 'user_universityid',
  targetKey: 'uni_universityid',
});

module.exports = User;
