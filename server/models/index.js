// models/index.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Property = require('./property');
const Favorite = require('./favourite');

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
Property.hasMany(Favorite, { foreignKey: 'propertyId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Property, { foreignKey: 'propertyId' });




const initModels = async () => {
    await User.sync({ alter: true });
    await Property.sync({ alter: true });
    await Favorite.sync({ alter: true });
};

module.exports = { User, Property, Favorite, initModels };
