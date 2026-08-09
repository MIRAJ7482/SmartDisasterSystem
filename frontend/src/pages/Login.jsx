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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Update AuthContext and LocalStorage
      login(data.user, data.token);


      // Go to report page after login
      navigate("/report");

    } catch (error) {
      console.error(error);

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

            {/* Header */}
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">
                Login
              </h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Email */}
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
                  />

                </div>

                {/* Password */}
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
                  />

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

              </form>

              {/* Register Option */}
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