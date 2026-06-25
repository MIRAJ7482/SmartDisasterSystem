import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    location: "",
    disasterType: "",
    severity: "",
    description: "",
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
      const res = await axios.post(
        "http://localhost:5000/api/reports",
        formData
      );

      alert("Report Submitted Successfully!");

      console.log(res.data);

      setFormData({
        location: "",
        disasterType: "",
        severity: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error Submitting Report");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Disaster Reporting System</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="disasterType"
          placeholder="Disaster Type"
          value={formData.disasterType}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="severity"
          placeholder="Severity"
          value={formData.severity}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default App;