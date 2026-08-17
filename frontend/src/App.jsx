import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportPage from "./pages/ReportPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* =========================
            PUBLIC HOME
        ========================= */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            PUBLIC DASHBOARD
        ========================= */}
        <Route
          path="/dashboard"
          element={<Dashboard refresh={false} />}
        />

        {/* =========================
            REGISTER
        ========================= */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            LOGIN
        ========================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            PROTECTED REPORT PAGE
        ========================= */}
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />

        {/* =========================
            INVALID URL
        ========================= */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>
      
    </>
  );
}

export default App;