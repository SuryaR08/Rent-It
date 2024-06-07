const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('../utils/otpGenerator');
const sendSMS = require('../utils/sendSMS');

exports.register = async (req, res) => {
    const { username, password, email, phoneNumber } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, password: hashedPassword, email, phoneNumber });
        const otp = otpGenerator();
        sendSMS(phoneNumber, `Your OTP is ${otp}`);
        res.status(201).json({ message: 'User registered, verify OTP sent to your phone' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};