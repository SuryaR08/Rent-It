const { Property } = require('../models');
const path = require('path');

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.addProperty = async (req, res) => {
    const { title, description, location, price } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        const property = await Property.create({ title, description, location, price, image });
        res.status(201).json(property);
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
