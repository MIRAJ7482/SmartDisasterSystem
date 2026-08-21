import { Link } from "react-router-dom";

function AdminOverview({ reports }) {

  // ===============================
  // Status Statistics
  // ===============================

  const pending = reports.filter(
    (report) =>
      !report.status ||
      report.status === "Pending"
  ).length;

  const underReview = reports.filter(
    (report) =>
      report.status === "Under Review"
  ).length;

  const resolved = reports.filter(
    (report) =>
      report.status === "Resolved"
  ).length;


  // ===============================
  // Severity Statistics
  // ===============================

  const high = reports.filter(
    (report) =>
      report.severity === "High"
  ).length;

  const medium = reports.filter(
    (report) =>
      report.severity === "Medium"
  ).length;

  const low = reports.filter(
    (report) =>
      report.severity === "Low"
  ).length;


  return (
    <>

      {/* ===============================
          Overview Charts
      =============================== */}

      <div className="row g-4 mb-4">

        {/* Status Overview */}

        <div className="col-md-6">

          <div className="card shadow-sm h-100">

            <div className="card-header">
              <h5 className="mb-0">
                📊 Report Status Overview
              </h5>
            </div>

            <div className="card-body">

              {/* Pending */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    🟡 Pending
                  </span>

                  <strong>
                    {pending}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-secondary"
                    style={{
                      width: `${
                        reports.length
                          ? (pending / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* Under Review */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    🔵 Under Review
                  </span>

                  <strong>
                    {underReview}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${
                        reports.length
                          ? (underReview / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* Resolved */}

              <div>

                <div className="d-flex justify-content-between">

                  <span>
                    🟢 Resolved
                  </span>

                  <strong>
                    {resolved}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${
                        reports.length
                          ? (resolved / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Severity Overview */}

        <div className="col-md-6">

          <div className="card shadow-sm h-100">

            <div className="card-header">
              <h5 className="mb-0">
                🚨 Severity Overview
              </h5>
            </div>

            <div className="card-body">

              {/* High */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    🔴 High Severity
                  </span>

                  <strong>
                    {high}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${
                        reports.length
                          ? (high / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* Medium */}

              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <span>
                    🟠 Medium Severity
                  </span>

                  <strong>
                    {medium}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${
                        reports.length
                          ? (medium / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* Low */}

              <div>

                <div className="d-flex justify-content-between">

                  <span>
                    🟢 Low Severity
                  </span>

                  <strong>
                    {low}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${
                        reports.length
                          ? (low / reports.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Quick Actions
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-header">

          <h5 className="mb-0">
            ⚡ Quick Actions
          </h5>

        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-4">

              <Link
                to="/admin/reports"
                className="btn btn-primary w-100"
              >
                📋 Manage Reports
              </Link>

            </div>


            <div className="col-md-4">

              <Link
                to="/admin/users"
                className="btn btn-info text-white w-100"
              >
                👥 Manage Users
              </Link>

            </div>


            <div className="col-md-4">

              <Link
                to="/admin/analytics"
                className="btn btn-success w-100"
              >
                📈 View Analytics
              </Link>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default AdminOverview;