const DisasterReport = require("../models/DisasterReport");

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await DisasterReport.find().sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create new report
const createReport = async (req, res) => {
  try {
    const report = await DisasterReport.create(req.body);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    const report = await DisasterReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    await report.deleteOne();

    res.json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update report
const updateReport = async (req, res) => {
  try {
    const report = await DisasterReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    const updatedReport = await DisasterReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReports,
  createReport,
  deleteReport,
  updateReport,
};