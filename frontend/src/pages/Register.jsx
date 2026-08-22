import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Production Backend URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://smart-disaster-backend-skfj.onrender.com";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE REGISTRATION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Registration API:",
        `${API_URL}/api/auth/register`
      );

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration Response:", response.data);

      alert("Registration Successful! Please Login.");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Go to login page
      navigate("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      // Backend error message
      if (error.response) {
        console.error(
          "Server Response:",
          error.response.data
        );

        alert(
          error.response.data?.message ||
          "Registration failed!"
        );

      } else if (error.request) {
        console.error(
          "No response from server:",
          error.request
        );

        alert(
          "Cannot connect to server. Please try again later."
        );

      } else {
        alert(
          "Registration failed! Please try again."
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

                {/* NAME */}

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

                {/* EMAIL */}

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

                {/* PASSWORD */}

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
                    placeholder="Create a password"
                    minLength="6"
                    required
                    disabled={loading}
                  />

                  <small className="text-muted">
                    Password must be at least 6 characters.
                  </small>

                </div>

                {/* CONFIRM PASSWORD */}

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
                    placeholder="Confirm your password"
                    minLength="6"
                    required
                    disabled={loading}
                  />

                </div>

                {/* REGISTER BUTTON */}

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