const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URL;


const connectDB = async () => {
    mongoose.connect(connectionString).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });
}//connectDB


module.exports = connectDB;