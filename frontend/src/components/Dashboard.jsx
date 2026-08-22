import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import ReportList from "./ReportList";
import DisasterMap from "./DisasterMap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard({ refresh }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const total = reports.length;

  const high = reports.filter(
    (r) => r.severity === "High"
  ).length;

  const medium = reports.filter(
    (r) => r.severity === "Medium"
  ).length;

  const low = reports.filter(
    (r) => r.severity === "Low"
  ).length;

  // =====================
  // BAR CHART
  // =====================

  const barData = {
    labels: ["High", "Medium", "Low"],

    datasets: [
      {
        label: "Number of Reports",
        data: [high, medium, low],

        backgroundColor: [
          "#dc3545",
          "#ffc107",
          "#198754",
        ],

        borderColor: [
          "#b02a37",
          "#cc9a06",
          "#146c43",
        ],

        borderWidth: 1,
      },
    ],
  };

  // =====================
  // DOUGHNUT CHART
  // =====================

  const doughnutData = {
    labels: ["High", "Medium", "Low"],

    datasets: [
      {
        data: [high, medium, low],

        backgroundColor: [
          "#dc3545",
          "#ffc107",
          "#198754",
        ],

        hoverBackgroundColor: [
          "#bb2d3b",
          "#ffca2c",
          "#157347",
        ],

        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="container-fluid mt-4">

      {/* =====================
          TITLE
      ====================== */}

      <h2 className="mb-4">
        📊 Disaster Dashboard
      </h2>

      {/* =====================
          STATISTICS
      ====================== */}

      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card text-center bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Reports</h5>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center bg-danger text-white shadow">
            <div className="card-body">
              <h5>High</h5>
              <h2>{high}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center bg-warning shadow">
            <div className="card-body">
              <h5>Medium</h5>
              <h2>{medium}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center bg-success text-white shadow">
            <div className="card-body">
              <h5>Low</h5>
              <h2>{low}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* =====================
          DISASTER MAP
      ====================== */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="mb-2">
            🗺️ Disaster Map
          </h3>

          <p className="text-muted mb-4">
            View reported disasters on the map.
          </p>

          <DisasterMap reports={reports} />

        </div>

      </div>

      {/* =====================
          CHARTS
      ====================== */}

      <div className="row g-4 mb-5">

        {/* BAR CHART */}

        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-body">

              <h5 className="card-title mb-4">
                📊 Reports by Severity
              </h5>

              <Bar
                data={barData}
                options={{
                  responsive: true,

                  plugins: {
                    legend: {
                      display: true,
                    },
                  },

                  scales: {
                    y: {
                      beginAtZero: true,

                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />

            </div>

          </div>

        </div>

        {/* DOUGHNUT CHART */}

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h5 className="card-title mb-4">
                🍩 Severity Distribution
              </h5>

              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,

                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                    },

                    tooltip: {
                      enabled: true,
                    },
                  },
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================
          PUBLIC REPORT LIST
      ====================== */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="mb-3">
            📋 Disaster Reports
          </h3>

          <p className="text-muted mb-4">
            View all reported disasters and their current conditions.
          </p>

          <ReportList
            refresh={refresh}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;