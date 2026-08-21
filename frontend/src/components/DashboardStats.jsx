function DashboardStats({ reports, users }) {
  const totalReports = reports.length;
  const totalUsers = users.length;

  // ===============================
  // Severity Statistics
  // ===============================

  const highReports = reports.filter(
    (report) => report.severity === "High"
  ).length;

  const mediumReports = reports.filter(
    (report) => report.severity === "Medium"
  ).length;

  const lowReports = reports.filter(
    (report) => report.severity === "Low"
  ).length;

  // ===============================
  // Status Statistics
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
    <div className="row g-3 mb-4">

      {/* Total Reports */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>Total Reports</h6>

            <h2 className="text-primary">
              {totalReports}
            </h2>
          </div>
        </div>
      </div>


      {/* Total Users */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>Total Users</h6>

            <h2 className="text-info">
              {totalUsers}
            </h2>
          </div>
        </div>
      </div>


      {/* Pending */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>🟡 Pending</h6>

            <h2 className="text-secondary">
              {pendingReports}
            </h2>
          </div>
        </div>
      </div>


      {/* Under Review */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>🔵 Under Review</h6>

            <h2 className="text-warning">
              {underReviewReports}
            </h2>
          </div>
        </div>
      </div>


      {/* Resolved */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>🟢 Resolved</h6>

            <h2 className="text-success">
              {resolvedReports}
            </h2>
          </div>
        </div>
      </div>


      {/* High Severity */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>High Severity</h6>

            <h2 className="text-danger">
              {highReports}
            </h2>
          </div>
        </div>
      </div>


      {/* Medium Severity */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>Medium Severity</h6>

            <h2 className="text-warning">
              {mediumReports}
            </h2>
          </div>
        </div>
      </div>


      {/* Low Severity */}

      <div className="col-md-3">
        <div className="card shadow-sm text-center h-100">
          <div className="card-body">
            <h6>Low Severity</h6>

            <h2 className="text-success">
              {lowReports}
            </h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardStats;