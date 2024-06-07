const { User, Property } = require('../models');

exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId, {
            include: [Property]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Add other user-related functionalities like updating profile, listing favorite properties, etc.
