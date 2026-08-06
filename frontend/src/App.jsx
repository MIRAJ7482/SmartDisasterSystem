import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import Login from "./pages/Login";

import { useState } from "react";

function Home() {
  const [refresh, setRefresh] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const refreshReports = () => {
    setRefresh(!refresh);
    setSelectedReport(null);
  };

  return (
    <div className="container mt-4">
      <ReportForm
        onReportAdded={refreshReports}
        selectedReport={selectedReport}
      />

      <Dashboard refresh={refresh} />

      <ReportList
        refresh={refresh}
        onEdit={setSelectedReport}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard refresh={false} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;