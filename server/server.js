require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { initModels } = require('./models');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await initModels();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
