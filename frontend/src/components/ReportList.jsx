import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";

function ReportList({
  refresh,
  onEdit = () => {},
  search = "",
  severityFilter = "All",
}) {
  const [reports, setReports] = useState([]);

  // =========================
  // NEW FILTER STATES
  // =========================

  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // =========================
  // LOAD REPORTS
  // =========================

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // =========================
  // DISASTER TYPES
  // =========================

  const disasterTypes = [
    ...new Set(
      reports
        .map((report) => report.disasterType)
        .filter(Boolean)
    ),
  ];

  // =========================
  // SEARCH + FILTER + SORT
  // =========================

  const filteredReports = reports
    .filter((report) => {

      // Search
      const searchText = search.toLowerCase();

      const searchMatch =
        !searchText ||
        (report.location || "")
          .toLowerCase()
          .includes(searchText) ||
        (report.disasterType || "")
          .toLowerCase()
          .includes(searchText) ||
        (report.description || "")
          .toLowerCase()
          .includes(searchText);

      // Severity
      const severityMatch =
        severityFilter === "All" ||
        report.severity === severityFilter;

      // Disaster Type
      const typeMatch =
        typeFilter === "All" ||
        report.disasterType === typeFilter;

      // Status
      const statusMatch =
        statusFilter === "All" ||
        (report.status || "Pending") === statusFilter;

      return (
        searchMatch &&
        severityMatch &&
        typeMatch &&
        statusMatch
      );
    })

    // =========================
    // SORTING
    // =========================

    .sort((a, b) => {

      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      if (sortOrder === "oldest") {
        return dateA - dateB;
      }

      return 0;
    });

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setTypeFilter("All");
    setStatusFilter("All");
    setSortOrder("newest");
  };

  return (
    <div className="container-fluid mt-4">

      {/* =========================
          TITLE
      ========================= */}

      <div className="mb-4">

        <h2 className="fw-bold">
          📋 Disaster Reports
        </h2>

        <p className="text-muted">
          View, search and filter all reported disasters.
        </p>

      </div>


      {/* =========================
          FILTER AREA
      ========================= */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Disaster Type */}

            <div className="col-lg-3 col-md-6">

              <label className="form-label fw-semibold">
                Disaster Type
              </label>

              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
              >

                <option value="All">
                  All Types
                </option>

                {disasterTypes.map((type) => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>

                ))}

              </select>

            </div>


            {/* Severity */}

            <div className="col-lg-3 col-md-6">

              <label className="form-label fw-semibold">
                Severity
              </label>

              <select
                className="form-select"
                value={severityFilter}
                disabled
              >

                <option value="All">
                  All Severity
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

              <small className="text-muted">
                Controlled by the main search/filter.
              </small>

            </div>


            {/* Status */}

            <div className="col-lg-3 col-md-6">

              <label className="form-label fw-semibold">
                Report Status
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


            {/* Sorting */}

            <div className="col-lg-3 col-md-6">

              <label className="form-label fw-semibold">
                Sort Reports
              </label>

              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
              >

                <option value="newest">
                  🆕 Newest First
                </option>

                <option value="oldest">
                  📅 Oldest First
                </option>

              </select>

            </div>

          </div>


          {/* Clear Button */}

          <div className="d-flex justify-content-between align-items-center mt-4">

            <span className="text-muted">

              Showing{" "}
              <strong>
                {filteredReports.length}
              </strong>{" "}
              of{" "}
              <strong>
                {reports.length}
              </strong>{" "}
              reports

            </span>


            <button
              className="btn btn-outline-secondary"
              onClick={clearFilters}
            >
              🔄 Clear Filters
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          REPORTS
      ========================= */}

      {filteredReports.length === 0 ? (

        <div className="text-center py-5">

          <div className="card shadow-sm">

            <div className="card-body py-5">

              <h4>
                📭 No Reports Found
              </h4>

              <p className="text-muted mb-0">
                No disaster reports match your search
                or filter.
              </p>

            </div>

          </div>

        </div>

      ) : (

        <div className="reports-grid">

          {filteredReports.map((report) => (

            <ReportCard
              key={report._id}
              report={report}
              onDelete={fetchReports}
              onEdit={onEdit}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default ReportList;