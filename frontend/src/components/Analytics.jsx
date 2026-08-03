import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Analytics({ refresh }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Severity Count
  const low = reports.filter((r) => r.severity === "Low").length;
  const medium = reports.filter((r) => r.severity === "Medium").length;
  const high = reports.filter((r) => r.severity === "High").length;

  // Disaster Type Count
  const disasterTypes = {};

  reports.forEach((report) => {
    disasterTypes[report.disasterType] =
      (disasterTypes[report.disasterType] || 0) + 1;
  });

  const pieData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [low, medium, high],
        backgroundColor: [
          "#28a745",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(disasterTypes),
    datasets: [
      {
        label: "Disaster Reports",
        data: Object.values(disasterTypes),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="row mb-4">

      <div className="col-md-6 mb-3">
        <div className="card shadow">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">
              📊 Severity Distribution
            </h5>
          </div>

          <div className="card-body">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-3">
        <div className="card shadow">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">
              📈 Disaster Types
            </h5>
          </div>

          <div className="card-body">
            <Bar data={barData} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;