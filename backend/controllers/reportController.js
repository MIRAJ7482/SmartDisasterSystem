const DisasterReport = require("../models/DisasterReport");

// =====================================
// GET ALL REPORTS
// Public - Everyone can view
// =====================================

const getReports = async (req, res) => {
  try {
    const reports = await DisasterReport.find()
      .populate("reportedBy", "name email role")
      .sort({
        createdAt: -1,
      });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// CREATE REPORT
// Logged-in users only
// =====================================

const createReport = async (req, res) => {
  try {
    const {
      location,
      disasterType,
      severity,
      description,
    } = req.body;

    // Check fields
    if (
      !location ||
      !disasterType ||
      !severity ||
      !description
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Create report
    const report = await DisasterReport.create({
      location,
      disasterType,
      severity,
      description,

      // Logged-in user's ID
      reportedBy: req.user.id,
    });

    res.status(201).json(report);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// DELETE REPORT
// Owner OR Admin
// =====================================

const deleteReport = async (req, res) => {
  try {
    const report = await DisasterReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Admin can delete any report
    const isAdmin =
      req.user.role === "admin";

    // Normal user can delete only own report
    const isOwner =
      report.reportedBy &&
      report.reportedBy.toString() === req.user.id;

    // Permission check
    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message:
          "You can only delete your own reports",
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


// =====================================
// UPDATE REPORT
// Owner OR Admin
// =====================================

const updateReport = async (req, res) => {
  try {
    const report = await DisasterReport.findById(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Check ownership
    const isOwner =
      report.reportedBy &&
      report.reportedBy.toString() === req.user.id;

    // Check admin
    const isAdmin =
      req.user.role === "admin";

    // Only owner or admin can edit
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message:
          "You can only edit your own reports",
      });
    }

    const updatedReport =
      await DisasterReport.findByIdAndUpdate(
        req.params.id,
        {
          location: req.body.location,
          disasterType: req.body.disasterType,
          severity: req.body.severity,
          description: req.body.description,
        },
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