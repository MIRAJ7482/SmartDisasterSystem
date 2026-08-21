import { useState } from "react";
import ReportForm from "../components/ReportForm";
import ReportList from "../components/ReportList";

function ReportPage() {
  const [refresh, setRefresh] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const refreshReports = () => {
    setRefresh((prev) => !prev);
    setSelectedReport(null);
  };

  const handleEdit = (report) => {
    setSelectedReport(report);

    // Edit form-এ scroll করবে
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-fluid mt-4">

      {/* Page Header */}
      <div className="text-center mb-4">
        <h2>🚨 Report a Disaster</h2>

        <p className="text-muted">
          Submit a disaster report to help the community.
        </p>
      </div>

      {/* Report Form */}
      <ReportForm
        onReportAdded={refreshReports}
        selectedReport={selectedReport}
      />

      {/* Report List */}
      <ReportList
        refresh={refresh}
        onEdit={handleEdit}
      />

    </div>
  );
}

export default ReportPage;