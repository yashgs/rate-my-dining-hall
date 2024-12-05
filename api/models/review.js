// models/review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Restaurant = require('./restaurant');

const Review = sequelize.define(
  'review',
  {
    rev_reviewid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'rev_reviewid',
    },
    rev_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'rev_content',
    },
    rev_tags: {
      type: DataTypes.ARRAY(DataTypes.STRING(100)),
      field: 'rev_tags',
    },
    rev_star_rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
      field: 'rev_star_rating',
    },
    rev_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'rev_title',
    },
    rev_userid: {
      type: DataTypes.INTEGER,
      field: 'rev_userid',
    },
    rev_restaurantid: {
      type: DataTypes.INTEGER,
      field: 'rev_restaurantid',
    },
  },
  {
    tableName: 'review',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Review;
