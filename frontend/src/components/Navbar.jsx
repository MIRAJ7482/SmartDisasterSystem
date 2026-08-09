import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();


    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🌪️ Smart Disaster
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          {/* Left Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Home */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Dashboard */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
              >
                📊 Dashboard
              </Link>
            </li>

            {/* Report */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/report"
              >
                🚨 Report Disaster
              </Link>
            </li>

          </ul>

          {/* Right Menu */}
          <ul className="navbar-nav">

            {user ? (
              <>
                {/* User Name */}
                <li className="nav-item">
                  <span className="nav-link text-warning">
                    👤 {user.name}
                  </span>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                {/* Register */}
                <li className="nav-item">
                  <Link
                    className="btn btn-primary btn-sm mt-1"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;