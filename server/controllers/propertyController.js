const { Property } = require('../models');

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getPropertyById = async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.addProperty = async (req, res) => {
    const { title, description, location, price } = req.body;
    const listedBy = req.userId;
    try {
        const property = await Property.create({ title, description, location, price, listedBy });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
