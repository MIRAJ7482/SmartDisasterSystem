const express = require("express");
const router = express.Router();

const DisasterReport = require("../models/DisasterReport");

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await DisasterReport.find();

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE report
router.post("/", async (req, res) => {
  try {
    const report = await DisasterReport.create(req.body);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
