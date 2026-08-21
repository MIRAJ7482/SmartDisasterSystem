const mongoose = require("mongoose");

const disasterReportSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },

    disasterType: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },

    description: {
      type: String,
      required: true,
    },

    // Report Status
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Resolved"],
      default: "Pending",
    },

    // User who created this report
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DisasterReport",
  disasterReportSchema
);