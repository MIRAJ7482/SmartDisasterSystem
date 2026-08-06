import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";

function ReportList({
  refresh,
  onEdit,
  search = "",
  severityFilter = "All",
}) {
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

  // Search + Filter
  const filteredReports = reports.filter((report) => {
    const locationMatch = (report.location || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const severityMatch =
      severityFilter === "All"
        ? true
        : report.severity === severityFilter;

    return locationMatch && severityMatch;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Disaster Reports</h2>

      {filteredReports.length === 0 ? (
        <p className="text-center text-muted">
          No reports found.
        </p>
      ) : (
        filteredReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onDelete={fetchReports}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default ReportList;