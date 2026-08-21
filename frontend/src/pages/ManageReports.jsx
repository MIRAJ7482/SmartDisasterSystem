import { useEffect, useState } from "react";

import { getReports } from "../services/reportService";
import RecentReports from "../components/RecentReports";

function ManageReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
  // Filter Reports
  // ===============================

  const filteredReports = reports.filter((report) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      report.location
        ?.toLowerCase()
        .includes(searchText) ||
      report.disasterType
        ?.toLowerCase()
        .includes(searchText) ||
      report.description
        ?.toLowerCase()
        .includes(searchText);

    const reportStatus =
      report.status || "Pending";

    const matchesStatus =
      statusFilter === "All" ||
      reportStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });


  // ===============================
  // Status Counts
  // ===============================

  const pendingReports = reports.filter(
    (report) =>
      !report.status ||
      report.status === "Pending"
  ).length;

  const underReviewReports = reports.filter(
    (report) =>
      report.status === "Under Review"
  ).length;

  const resolvedReports = reports.filter(
    (report) =>
      report.status === "Resolved"
  ).length;


  return (
    <div className="container mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="mb-4">

        <h2>
          📋 Manage Reports
        </h2>

        <p className="text-muted">
          View, search, edit, delete and manage
          disaster report statuses.
        </p>

      </div>


      {/* ===============================
          Summary
      =============================== */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🟡 Pending
              </h6>

              <h3 className="text-secondary">
                {pendingReports}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🔵 Under Review
              </h6>

              <h3 className="text-warning">
                {underReviewReports}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🟢 Resolved
              </h6>

              <h3 className="text-success">
                {resolvedReports}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Search & Filter
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-8">

              <label className="form-label">
                🔍 Search Reports
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by location, disaster type or description..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Status Filter */}

            <div className="col-md-4">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >

                <option value="All">
                  All Status
                </option>

                <option value="Pending">
                  🟡 Pending
                </option>

                <option value="Under Review">
                  🔵 Under Review
                </option>

                <option value="Resolved">
                  🟢 Resolved
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Results Count
      =============================== */}

      <div className="mb-3">

        <strong>
          Showing {filteredReports.length} of{" "}
          {reports.length} reports
        </strong>

      </div>


      {/* ===============================
          Reports Table
      =============================== */}

      <RecentReports
        reports={filteredReports}
        onRefresh={loadReports}
      />

    </div>
  );
}

export default ManageReports;