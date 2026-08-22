import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================
  // Handle Input Change
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // Handle Login
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    // Check email
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Check password
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      console.log("Login data:", {
        email: email,
        password: "***",
      });

      const data = await loginUser({
        email,
        password,
      });

      console.log("Login response:", data);

      // =================================
      // Check Response
      // =================================

      if (!data || !data.user || !data.token) {
        alert("Invalid server response. Please try again.");
        return;
      }

      // =================================
      // Update AuthContext
      // =================================

      login(data.user, data.token);

      // =================================
      // Role Based Redirect
      // =================================

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login Error:", error);

      console.error(
        "Server Status:",
        error.response?.status
      );

      console.error(
        "Server Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            {/* =========================
                HEADER
            ========================== */}

            <div className="card-header bg-primary text-white text-center">

              <h3 className="mb-0">
                Login
              </h3>

            </div>

            {/* =========================
                BODY
            ========================== */}

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {/* =========================
                    EMAIL
                ========================== */}

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    autoComplete="email"
                  />

                </div>

                {/* =========================
                    PASSWORD
                ========================== */}

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />

                </div>

                {/* =========================
                    LOGIN BUTTON
                ========================== */}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>

                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}

                </button>

              </form>

              {/* =========================
                  REGISTER OPTION
              ========================== */}

              <div className="text-center mt-4">

                <p className="mb-1">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="btn btn-outline-primary btn-sm"
                >
                  Create New Account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;