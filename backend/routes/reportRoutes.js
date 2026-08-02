const express = require("express");
const router = express.Router();

const {
  getReports,
  createReport,
  deleteReport,
  updateReport,
} = require("../controllers/reportController");

// GET all reports
router.get("/", getReports);

// CREATE report
router.post("/", createReport);

// UPDATE report
router.put("/:id", updateReport);

// DELETE report
router.delete("/:id", deleteReport);

module.exports = router;