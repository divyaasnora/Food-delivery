const express = require("express");
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors()); // enough for CORS

const mongoDB = require("./db");

// ✅ Parse JSON BEFORE routes
app.use(express.json());

// Connect DB
mongoDB();

// Routes
app.use('/api', require('./Routes/CreateUser'));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});