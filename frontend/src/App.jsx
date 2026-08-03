import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import SearchFilter from "./components/SearchFilter";
import Analytics from "./components/Analytics";

function App() {
  const [refresh, setRefresh] = useState(false);

  // Selected report for editing
  const [selectedReport, setSelectedReport] = useState(null);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const refreshReports = () => {
    setRefresh(!refresh);
    setSelectedReport(null);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <ReportForm
          onReportAdded={refreshReports}
          selectedReport={selectedReport}
        />

        <Dashboard refresh={refresh} />
        <Analytics refresh={refresh} />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
        />

        <ReportList
          refresh={refresh}
          onEdit={setSelectedReport}
          search={search}
          severityFilter={severityFilter}
        />
      </div>
    </>
  );
}

export default App;