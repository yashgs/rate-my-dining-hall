const sequelize = require('../config/database');
const University = require('./university');
const User = require('./user');
const Restaurant = require('./restaurant');
const Review = require('./review');

// Associations
University.hasMany(User, {
  foreignKey: 'user_universityid',
  sourceKey: 'uni_universityid',
});

University.hasMany(Restaurant, {
  foreignKey: 'res_universityid',
  sourceKey: 'uni_universityid',
});

Review.belongsTo(User, {
  foreignKey: 'rev_userid',
  targetKey: 'user_userid',
});

User.hasMany(Review, {
  foreignKey: 'rev_userid',
  sourceKey: 'user_userid',
});

Restaurant.hasMany(Review, {
  foreignKey: 'rev_restaurantid',
  sourceKey: 'res_restaurantid',
});

module.exports = {
  sequelize,
  University,
  User,
  Restaurant,
  Review,
};
