require("dotenv").config();
const mongoose = require('mongoose');

// Establish connection to MongoDB
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
        process.exit(1); 
    }
};

module.exports = connectToDb;