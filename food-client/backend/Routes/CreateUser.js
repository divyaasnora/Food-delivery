const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ef358cce61a97c8c3c6b9d44a466c1276f7916ad6028e91a32f7fdac5b030d83";



// ===================== CREATE USER =====================
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter valid email"),
    body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 chars"),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // ✅ Check if user already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // ✅ Generate salt & hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // ✅ Create user
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });
      const data = {
        user:{
          id: newUser.id,
        }
      };
      const authToken = jwt.sign(data,JWT_SECRET);

      return res.json({
        success: true,
        message: "User created successfully",
        authToken,
        user: newUser,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false });
    }
  }
);


// ===================== LOGIN USER =====================
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter valid email"),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // ✅ Find user
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      const data = {
        user:{
          id:userData.id,
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);

      // ✅ Compare password
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      // ✅ Login successufull
      return res.json({
        success: true,
        message: "Login successful",
        authToken,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false });
    }
  }
);


module.exports = router;