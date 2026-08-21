const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// =====================================
// Admin User Management
// =====================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);


router.put(
  "/users/:id/role",
  protect,
  adminOnly,
  updateUserRole
);


module.exports = router;