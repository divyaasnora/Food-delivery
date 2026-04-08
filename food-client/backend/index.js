const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();

const cors = require('cors');
app.use(cors()); // enough for CORS

const mongoDB = require("./db");


app.use(express.json());

mongoDB();

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});