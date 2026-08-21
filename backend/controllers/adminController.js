const User = require("../models/User");

// =====================================
// Get All Users
// Admin Only
// =====================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};


// =====================================
// Delete User
// Admin Only
// =====================================

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting himself
    if (req.user.id === userId) {
      return res.status(400).json({
        message: "You cannot delete your own admin account.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully.",
    });

  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      message: "Failed to delete user.",
    });
  }
};


// =====================================
// Update User Role
// Admin Only
// =====================================

const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role.",
      });
    }

    // Prevent changing own role
    if (req.user.id === userId) {
      return res.status(400).json({
        message: "You cannot change your own role.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      message: "User role updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Update Role Error:", error);

    res.status(500).json({
      message: "Failed to update user role.",
    });
  }
};


module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
};