import { useState } from "react";
import { loginUser } from "../services/reportService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");

      console.log(data);

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Login</h3>
        </div>

        <div className="card-body">

          <form onSubmit={submitHandler}>

            <div className="mb-3">
              <label>Email</label>

              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>

              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;