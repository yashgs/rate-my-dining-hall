// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Database username
  process.env.DB_PASS,    // Database password
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
