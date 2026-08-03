import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";

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
      console.error(error);
    }
  };

  const total = reports.length;
  const high = reports.filter(r => r.severity === "High").length;
  const medium = reports.filter(r => r.severity === "Medium").length;
  const low = reports.filter(r => r.severity === "Low").length;

  return (
    <div className="row mb-4">

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
  );
}

export default Dashboard;