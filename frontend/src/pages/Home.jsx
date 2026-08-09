import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center py-5">

          <h1 className="display-4 fw-bold">
            Smart Disaster Reporting System
          </h1>

          <p className="lead mt-3">
            Report, monitor and understand disasters in real time.
          </p>

          <div className="mt-4">

            <Link
              to="/dashboard"
              className="btn btn-light btn-lg me-2"
            >
              📊 View Dashboard
            </Link>

            <Link
              to="/report"
              className="btn btn-warning btn-lg"
            >
              🚨 Report a Disaster
            </Link>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">

        <h2 className="text-center mb-4">
          Why Use Our System?
        </h2>

        <div className="row g-4">

          {/* Feature 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">

                <h3>📍</h3>

                <h5>Disaster Reports</h5>

                <p className="text-muted">
                  View reported disasters and their current conditions.
                </p>

              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">

                <h3>📊</h3>

                <h5>Analytics Dashboard</h5>

                <p className="text-muted">
                  Analyze disaster information using charts and statistics.
                </p>

              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">

                <h3>🚨</h3>

                <h5>Report Disaster</h5>

                <p className="text-muted">
                  Logged-in users can quickly submit disaster reports.
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-light py-5">

        <div className="container text-center">

          <h3>
            Have you witnessed a disaster?
          </h3>

          <p className="text-muted">
            Login and help the community by submitting a report.
          </p>

          <Link
            to="/report"
            className="btn btn-danger"
          >
            🚨 Report a Disaster
          </Link>

        </div>
      </div>

    </div>
  );
}

export default Home;