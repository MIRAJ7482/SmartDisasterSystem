import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DisasterChart({ reports }) {

  const disasterTypes = [
    "Fire",
    "Flood",
    "Cyclone",
    "Earthquake",
    "Accident",
    "Landslide",
    "Drought",
    "Storm",
    "Tornado",
    "Other",
  ];

  const counts = disasterTypes.map(
    (type) =>
      reports.filter(
        (report) =>
          report.disasterType?.toLowerCase() ===
          type.toLowerCase()
      ).length
  );

  const data = {
    labels: disasterTypes,

    datasets: [
      {
        label: "Number of Reports",

        data: counts,

        backgroundColor: [
          "#ff5733", // Fire
          "#3498db", // Flood
          "#9b59b6", // Cyclone
          "#e67e22", // Earthquake
          "#34495e", // Accident
          "#795548", // Landslide
          "#f1c40f", // Drought
          "#1abc9c", // Storm
          "#2ecc71", // Tornado
          "#95a5a6", // Other
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
      },

      title: {
        display: true,
        text: "Disaster Type Statistics",
      },
    },
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h5 className="mb-0">
          📊 Disaster Type Statistics
        </h5>
      </div>

      <div className="card-body">

        <Bar
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default DisasterChart;