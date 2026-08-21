import { useEffect, useState } from "react";

import { getReports } from "../services/reportService";
import RecentReports from "../components/RecentReports";

function ManageReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Search & Filters
  // ===============================

  const [search, setSearch] = useState("");
  const [disasterType, setDisasterType] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  // ===============================
  // Load Reports
  // ===============================

  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();

      setReports(data);
    } catch (error) {
      console.error(
        "Failed to load reports:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Load Reports on Page Load
  // ===============================

  useEffect(() => {
    loadReports();
  }, []);

  // ===============================
  // Filter Reports
  // ===============================

  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      report.location?.toLowerCase().includes(searchText) ||
      report.disasterType?.toLowerCase().includes(searchText) ||
      report.description?.toLowerCase().includes(searchText) ||
      report.reportedBy?.name
        ?.toLowerCase()
        .includes(searchText) ||
      report.reportedBy?.email
        ?.toLowerCase()
        .includes(searchText);

    const matchesDisaster =
      disasterType === "All" ||
      report.disasterType === disasterType;

    const matchesSeverity =
      severity === "All" ||
      report.severity === severity;

    const matchesStatus =
      status === "All" ||
      (report.status || "Pending") === status;

    return (
      matchesSearch &&
      matchesDisaster &&
      matchesSeverity &&
      matchesStatus
    );
  });

  // ===============================
  // Reset Filters
  // ===============================

  const handleReset = () => {
    setSearch("");
    setDisasterType("All");
    setSeverity("All");
    setStatus("All");
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-2">
          Loading reports...
        </p>

      </div>
    );
  }

  // ===============================
  // Manage Reports
  // ===============================

  return (
    <div className="container-fluid mt-4">

      {/* Header */}

      <div className="mb-4">

        <h2>
          📋 Manage Reports
        </h2>

        <p className="text-muted">
          Search, filter and manage disaster reports.
        </p>

      </div>


      {/* ===============================
          Search & Filters
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-4">

              <label className="form-label">
                🔍 Search Reports
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Location, disaster, reporter..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Disaster Type */}

            <div className="col-md-2">

              <label className="form-label">
                Disaster Type
              </label>

              <select
                className="form-select"
                value={disasterType}
                onChange={(e) =>
                  setDisasterType(e.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Flood">
                  Flood
                </option>

                <option value="Cyclone">
                  Cyclone
                </option>

                <option value="Fire">
                  Fire
                </option>

                <option value="Earthquake">
                  Earthquake
                </option>

                <option value="Landslide">
                  Landslide
                </option>

              </select>

            </div>


            {/* Severity */}

            <div className="col-md-2">

              <label className="form-label">
                Severity
              </label>

              <select
                className="form-select"
                value={severity}
                onChange={(e) =>
                  setSeverity(e.target.value)
                }
              >

                <option value="All">
                  All
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


            {/* Status */}

            <div className="col-md-2">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Under Review">
                  Under Review
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>

            </div>


            {/* Reset */}

            <div className="col-md-2 d-flex align-items-end">

              <button
                className="btn btn-secondary w-100"
                onClick={handleReset}
              >
                🔄 Reset
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* Result Count */}

      <div className="mb-3">

        <strong>
          Showing {filteredReports.length} of{" "}
          {reports.length} reports
        </strong>

      </div>


      {/* Reports */}

      <RecentReports
        reports={filteredReports}
        onRefresh={loadReports}
      />

    </div>
  );
}

export default ManageReports;