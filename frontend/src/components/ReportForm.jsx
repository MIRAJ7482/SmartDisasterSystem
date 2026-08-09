import { useState, useEffect } from "react";

import {
  createReport,
  updateReport,
} from "../services/reportService";

function ReportForm({ onReportAdded, selectedReport }) {
  const [formData, setFormData] = useState({
    location: "",
    disasterType: "",
    severity: "",
    description: "",
  });

  // ===============================
  // Edit Mode
  // ===============================

  useEffect(() => {
    if (selectedReport) {
      setFormData({
        location: selectedReport.location || "",
        disasterType: selectedReport.disasterType || "",
        severity: selectedReport.severity || "",
        description: selectedReport.description || "",
      });
    } else {
      setFormData({
        location: "",
        disasterType: "",
        severity: "",
        description: "",
      });
    }
  }, [selectedReport]);

  // ===============================
  // Handle Input
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // Submit
  // ===============================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // =========================
      // UPDATE
      // =========================

      if (selectedReport) {
        await updateReport(
          selectedReport._id,
          formData
        );

        // Clear form
        setFormData({
          location: "",
          disasterType: "",
          severity: "",
          description: "",
        });

        // Refresh reports
        if (onReportAdded) {
          onReportAdded();
        }

        alert("Report Updated Successfully!");
      }

      // =========================
      // CREATE
      // =========================

      else {
        await createReport(formData);

        // Clear form
        setFormData({
          location: "",
          disasterType: "",
          severity: "",
          description: "",
        });

        // Refresh reports
        if (onReportAdded) {
          onReportAdded();
        }

        alert("Report Submitted Successfully!");
      }

    } catch (error) {
      console.error(
        "Report Operation Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  return (
    <div className="card shadow mb-4">

      {/* Header */}

      <div className="card-header bg-primary text-white">

        <h4 className="mb-0">
          {selectedReport
            ? "Edit Disaster Report"
            : "Report a Disaster"}
        </h4>

      </div>

      {/* Body */}

      <div className="card-body">

        <form onSubmit={submitHandler}>

          {/* Location */}

          <div className="mb-3">

            <label className="form-label">
              Location
            </label>

            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter disaster location"
              required
            />

          </div>

          {/* Disaster Type */}

          <div className="mb-3">

            <label className="form-label">
              Disaster Type
            </label>

            <input
              type="text"
              className="form-control"
              name="disasterType"
              value={formData.disasterType}
              onChange={handleChange}
              placeholder="Example: Flood, Fire, Cyclone"
              required
            />

          </div>

          {/* Severity */}

          <div className="mb-3">

            <label className="form-label">
              Severity
            </label>

            <select
              className="form-select"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Severity
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>

          {/* Description */}

          <div className="mb-3">

            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the disaster condition..."
              required
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {selectedReport
              ? "Update Report"
              : "Submit Report"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReportForm;