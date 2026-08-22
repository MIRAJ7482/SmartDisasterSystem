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
      formData,
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
      // UPDATE REPORT
      // =========================

      if (selectedReport) {
        await updateReport(
          selectedReport._id,
          formData
        );

        setFormData({
          location: "",
          disasterType: "",
          severity: "",
          description: "",
        });

        if (onReportAdded) {
          onReportAdded();
        }

        alert("Report Updated Successfully!");
      }

      // =========================
      // CREATE REPORT
      // =========================

      else {
        await createReport(formData);

        setFormData({
          location: "",
          disasterType: "",
          severity: "",
          description: "",
        });

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

      {/* ===============================
          HEADER
      =============================== */}

      <div className="card-header bg-primary text-white">

        <h4 className="mb-0">
          {selectedReport
            ? "Edit Disaster Report"
            : "Report a Disaster"}
        </h4>

      </div>

      {/* ===============================
          BODY
      =============================== */}

      <div className="card-body">

        <form onSubmit={submitHandler}>

          {/* ===============================
              LOCATION
          =============================== */}

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

          {/* ===============================
              DISASTER TYPE
          =============================== */}

          <div className="mb-3">

            <label className="form-label">
              Disaster Type
            </label>

            <select
              className="form-select"
              name="disasterType"
              value={formData.disasterType}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Disaster Type
              </option>

              <option value="Fire">
                🔥 Fire
              </option>

              <option value="Flood">
                🌊 Flood
              </option>

              <option value="Cyclone">
                🌀 Cyclone
              </option>

              <option value="Earthquake">
                🌍 Earthquake
              </option>

              <option value="Road Accident">
                🚗 Road Accident
              </option>

              <option value="Landslide">
                ⛰️ Landslide
              </option>

              <option value="Storm">
                🌪️ Storm
              </option>

              <option value="Tsunami">
                🌊 Tsunami
              </option>

              <option value="Volcanic Eruption">
                🌋 Volcanic Eruption
              </option>

              <option value="Drought">
                ☀️ Drought
              </option>

            </select>

          </div>

          {/* ===============================
              SEVERITY
          =============================== */}

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

          {/* ===============================
              DESCRIPTION
          =============================== */}

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

          {/* ===============================
              SUBMIT BUTTON
          =============================== */}

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