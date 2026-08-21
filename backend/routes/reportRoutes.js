const express = require("express");

const router = express.Router();

const {
  getReports,
  createReport,
  deleteReport,
  updateReport,
  updateReportStatus,
} = require("../controllers/reportController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// =====================================
// GET ALL REPORTS
// Public - Everyone can view
// =====================================

router.get(
  "/",
  getReports
);


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
// =====================================

router.put(
  "/:id",
  protect,
  updateReport
);


// =====================================
// DELETE REPORT
// Owner OR Admin
// =====================================

router.delete(
  "/:id",
  protect,
  deleteReport
);


// =====================================
// UPDATE REPORT STATUS
// Admin Only
// =====================================

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateReportStatus
);


module.exports = router;