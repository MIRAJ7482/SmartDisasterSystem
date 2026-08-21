import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ===============================
  // Check Admin
  // ===============================

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid mt-4">

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


            {/* Public Dashboard */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
              >
                📊 Dashboard
              </Link>
            </li>


            {/* Report Disaster */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/report"
              >
                🚨 Report Disaster
              </Link>
            </li>


            {/* ===============================
                ADMIN MENU
            =============================== */}

            {isAdmin && (
              <li className="nav-item dropdown">

                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ⚙️ Admin Menu
                </a>

                <ul className="dropdown-menu">

                  {/* Admin Dashboard */}

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin"
                    >
                      📊 Admin Dashboard
                    </Link>
                  </li>


                  {/* Manage Reports */}

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/reports"
                    >
                      📋 Manage Reports
                    </Link>
                  </li>


                  {/* Manage Users */}

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/users"
                    >
                      👥 Manage Users
                    </Link>
                  </li>


                  {/* Analytics */}

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/analytics"
                    >
                      📈 Analytics
                    </Link>
                  </li>

                </ul>

              </li>
            )}

          </ul>


          {/* Right Menu */}

          <ul className="navbar-nav">

            {user ? (
              <>

                {/* User Name */}

                <li className="nav-item">
                  <span className="nav-link text-warning">
                    👤 {user.name}

                    {isAdmin && (
                      <span className="badge bg-danger ms-2">
                        Admin
                      </span>
                    )}
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