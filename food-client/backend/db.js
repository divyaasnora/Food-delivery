const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:SjnjDhP92dDm3UEX@cluster0.btbfw8h.mongodb.net/gofoodmern';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected ✅");

        const db = mongoose.connection.db;

        const data = await db.collection("food_items").find({}).toArray();

        console.log("Fetched Data:");

    } catch (error) {
        console.error("MongoDB connection error ❌", error);
    }
}

module.exports = mongoDB;