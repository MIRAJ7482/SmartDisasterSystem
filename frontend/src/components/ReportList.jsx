import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";

function ReportList({ refresh }) {
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Disaster Reports</h2>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
        <ReportCard
            key={report._id}
            report={report}
            onDelete={fetchReports}
          />
        ))
      )}
    </div>
  );
}

export default ReportList;