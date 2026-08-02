import { useState } from "react";

import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshReports = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <ReportForm onReportAdded={refreshReports} />

        <ReportList refresh={refresh} />

      </div>
    </>
  );
}

export default App;