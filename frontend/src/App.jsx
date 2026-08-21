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
import ManageReports from "./pages/ManageReports";
import ManageUsers from "./pages/ManageUsers";
import AdminAnalytics from "./pages/AdminAnalytics";

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
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* =========================
            ADMIN - MANAGE REPORTS
        ========================= */}

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <ManageReports />
            </AdminRoute>
          }
        />


        {/* =========================
            ADMIN - MANAGE USERS
        ========================= */}

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />


        {/* =========================
            ADMIN - ANALYTICS
        ========================= */}

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />


        {/* =========================
            INVALID URL
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </>
  );
}

export default App;