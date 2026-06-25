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
    },
    description: {
      type: String,
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