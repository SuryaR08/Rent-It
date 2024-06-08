const User = require('./user');
const Property = require('./property');

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

const initModels = async () => {
    await User.sync({ alter: true });  // Using alter: true for development, consider { force: true } for a full drop and recreate
    await Property.sync({ alter: true });
};

module.exports = { User, Property, initModels };


