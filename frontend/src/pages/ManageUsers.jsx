import { useEffect, useState } from "react";

import { getAllUsers } from "../services/adminService";
import UserManagement from "../components/UserManagement";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // ===============================
  // Load Users
  // ===============================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data);
    } catch (error) {
      console.error(
        "Failed to load users:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Load Users on Page Load
  // ===============================

  useEffect(() => {
    loadUsers();
  }, []);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-2">
          Loading users...
        </p>

      </div>
    );
  }

  // ===============================
  // User Statistics
  // ===============================

  const totalUsers = users.length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const normalUsers = users.filter(
    (user) => user.role !== "admin"
  ).length;


  // ===============================
  // Filter Users
  // ===============================

  const filteredUsers = users.filter((user) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name
        ?.toLowerCase()
        .includes(searchText) ||
      user.email
        ?.toLowerCase()
        .includes(searchText);

    const matchesRole =
      roleFilter === "All" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });


  return (
    <div className="container-fluid mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="mb-4">

        <h2>
          👥 Manage Users
        </h2>

        <p className="text-muted">
          View, search and manage registered users.
        </p>

      </div>


      {/* ===============================
          User Statistics
      =============================== */}

      <div className="row g-3 mb-4">

        {/* Total Users */}

        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                👥 Total Users
              </h6>

              <h3 className="text-primary">
                {totalUsers}
              </h3>

            </div>

          </div>

        </div>


        {/* Admin Users */}

        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🛡️ Administrators
              </h6>

              <h3 className="text-danger">
                {adminUsers}
              </h3>

            </div>

          </div>

        </div>


        {/* Normal Users */}

        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                👤 Regular Users
              </h6>

              <h3 className="text-success">
                {normalUsers}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Search & Filter
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-8">

              <label className="form-label">
                🔍 Search Users
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Role Filter */}

            <div className="col-md-4">

              <label className="form-label">
                Role
              </label>

              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
              >

                <option value="All">
                  All Users
                </option>

                <option value="admin">
                  🛡️ Administrators
                </option>

                <option value="user">
                  👤 Regular Users
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Results Count
      =============================== */}

      <div className="mb-3">

        <strong>
          Showing {filteredUsers.length} of{" "}
          {users.length} users
        </strong>

      </div>


      {/* ===============================
          User Management
      =============================== */}

      <UserManagement
        users={filteredUsers}
        onRefresh={loadUsers}
      />

    </div>
  );
}

export default ManageUsers;