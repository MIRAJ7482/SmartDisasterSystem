import ReportForm from "../components/ReportForm";

function ReportPage() {
  return (
    <div className="container mt-4">

      <div className="text-center mb-4">
        <h2>🚨 Report a Disaster</h2>

        <p className="text-muted">
          Submit a disaster report to help the community.
        </p>
      </div>

      <ReportForm />

    </div>
  );
}

export default ReportPage;