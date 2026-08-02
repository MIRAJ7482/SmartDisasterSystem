import { useState } from "react";
import { createReport } from "../services/reportService";

function ReportForm({ onReportAdded }) {
  const [formData, setFormData] = useState({
    location: "",
    disasterType: "",
    severity: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReport(formData);

      alert("Report Submitted Successfully!");

      setFormData({
        location: "",
        disasterType: "",
        severity: "",
        description: "",
      });

      onReportAdded();
    } catch (error) {
      console.error(error);
      alert("Error Submitting Report");
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Report a Disaster</h4>
      </div>

      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Disaster Type</label>
            <input
              className="form-control"
              name="disasterType"
              value={formData.disasterType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Severity</label>

            <select
              className="form-select"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >
              <option value="">Select Severity</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>

            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;