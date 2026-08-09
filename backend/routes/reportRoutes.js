const express = require("express");
const router = express.Router();

const {
  getReports,
  createReport,
  deleteReport,
  updateReport,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

// =====================================
// GET ALL REPORTS
// Public - Everyone can view
// =====================================

router.get("/", getReports);


// =====================================
// CREATE REPORT
// Logged-in users only
// =====================================

router.post(
  "/",
  protect,
  createReport
);


// =====================================
// UPDATE REPORT
// Owner OR Admin
// Permission checked in controller
// =====================================

router.put(
  "/:id",
  protect,
  updateReport
);


// =====================================
// DELETE REPORT
// Owner OR Admin
// Permission checked in controller
// =====================================

router.delete(
  "/:id",
  protect,
  deleteReport
);


module.exports = router;