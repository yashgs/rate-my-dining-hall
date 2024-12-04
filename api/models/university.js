// models/university.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const University = sequelize.define(
  'university',
  {
    uni_universityid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'uni_universityid',
    },
    uni_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'uni_name',
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
  },
  {
    tableName: 'university', // Match the exact table name in your database
    timestamps: false,       // Disable timestamps if not present in your table
    freezeTableName: true,   // Prevent Sequelize from pluralizing table names
  }
);

module.exports = University;
