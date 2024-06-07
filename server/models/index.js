const User = require('./user');
const Property = require('./property');

User.hasMany(Property, { foreignKey: 'listedBy' });
Property.belongsTo(User, { foreignKey: 'listedBy' });

const initModels = async () => {
    await User.sync();
    await Property.sync();
};

module.exports = { User, Property, initModels };
