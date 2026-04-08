const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");

    const db = mongoose.connection.db;

    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategory = await db.collection("foodCategory").find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    console.log("Data loaded successfully 🚀");

  } catch (error) {
    console.error("MongoDB connection error ❌", error);
  }
};

module.exports = mongoDB;