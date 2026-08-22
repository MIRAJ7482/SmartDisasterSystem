import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ===============================
// BACKEND API URL
// ===============================
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://smart-disaster-backend-skfj.onrender.com";

function Register() {
  const navigate = useNavigate();

  // ===============================
  // FORM STATE
  // ===============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // HANDLE REGISTER
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get values directly from state
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ===============================
    // PASSWORD CHECK
    // ===============================

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ===============================
    // PASSWORD LENGTH
    // ===============================

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    // ===============================
    // EMAIL CHECK
    // ===============================

    if (!email.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Register API:",
        `${API_URL}/api/auth/register`
      );

      // ===============================
      // REGISTER REQUEST
      // ===============================

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Registration Response:",
        response.data
      );

      // ===============================
      // SUCCESS
      // ===============================

      alert(
        "Registration Successful! Please Login."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Go to login
      navigate("/login");

    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      // ===============================
      // SERVER ERROR
      // ===============================

      if (error.response) {
        console.error(
          "Server Response:",
          error.response.data
        );

        alert(
          error.response.data?.message ||
          "Registration failed!"
        );
      }

      // ===============================
      // NETWORK ERROR
      // ===============================

      else if (error.request) {
        console.error(
          "Network Error:",
          error.request
        );

        alert(
          "Unable to connect to server. Please try again."
        );
      }

      // ===============================
      // OTHER ERROR
      // ===============================

      else {
        alert(
          "Something went wrong. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="card shadow">

            {/* =========================
                HEADER
            ========================== */}

            <div className="card-header bg-primary text-white text-center">

              <h3 className="mb-0">
                Create Account
              </h3>

            </div>

            {/* =========================
                BODY
            ========================== */}

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {/* =========================
                    NAME
                ========================== */}

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />

                </div>

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
                    placeholder="Enter password"
                    minLength={6}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                  />

                  <small className="text-muted">
                    Minimum 6 characters
                  </small>

                </div>

                {/* =========================
                    CONFIRM PASSWORD
                ========================== */}

                <div className="mb-3">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    minLength={6}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                  />

                </div>

                {/* =========================
                    REGISTER BUTTON
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

                      Creating Account...
                    </>
                  ) : (
                    "Register"
                  )}

                </button>

              </form>

              {/* =========================
                  LOGIN LINK
              ========================== */}

              <div className="text-center mt-4">

                <p className="mb-1">
                  Already have an account?
                </p>

                <Link
                  to="/login"
                  className="text-decoration-none"
                >
                  Login here
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;