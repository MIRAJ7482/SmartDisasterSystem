const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// =====================================
// TEST
// =====================================

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

// =====================================
// REGISTER
// Public
// =====================================

router.post("/register", registerUser);

// =====================================
// LOGIN
// Public
// =====================================

router.post("/login", loginUser);

// =====================================
// GET ALL USERS
// Admin Only
// =====================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

module.exports = router;