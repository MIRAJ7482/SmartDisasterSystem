import {
  deleteUser,
  updateUserRole,
} from "../services/adminService";

import { useAuth } from "../context/AuthContext";

function UserManagement({ users, onRefresh }) {
  const { user: currentUser } = useAuth();

  // ===============================
  // Delete User
  // ===============================

  const handleDeleteUser = async (id) => {
    // Prevent deleting own account
    if (currentUser?._id === id) {
      alert("You cannot delete your own admin account.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("User deleted successfully.");

      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error(
        "Delete User Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  // ===============================
  // Change User Role
  // ===============================

  const handleRoleChange = async (
    id,
    currentRole
  ) => {
    // Prevent changing own role
    if (currentUser?._id === id) {
      alert("You cannot change your own admin role.");
      return;
    }

    const newRole =
      currentRole === "admin"
        ? "user"
        : "admin";

    const confirmChange = window.confirm(
      `Change this user's role to ${newRole}?`
    );

    if (!confirmChange) return;

    try {
      await updateUserRole(
        id,
        newRole
      );

      alert(
        `User role changed to ${newRole}.`
      );

      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error(
        "Role Update Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Role update failed."
      );
    }
  };

  return (
    <div className="card shadow-sm mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="card-header">

        <h5 className="mb-0">
          👥 User Management
        </h5>

      </div>


      {/* ===============================
          Body
      =============================== */}

      <div className="card-body">

        {users.length === 0 ? (

          <p className="text-muted text-center">
            No users found.
          </p>

        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {users.map((user) => {

                  const isCurrentUser =
                    currentUser?._id === user._id;

                  return (
                    <tr key={user._id}>

                      {/* Name */}

                      <td>
                        <strong>
                          {user.name}
                        </strong>

                        {isCurrentUser && (
                          <span className="badge bg-secondary ms-2">
                            You
                          </span>
                        )}
                      </td>


                      {/* Email */}

                      <td>
                        {user.email}
                      </td>


                      {/* Role */}

                      <td>

                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-danger"
                              : "bg-primary"
                          }`}
                        >
                          {user.role === "admin"
                            ? "🛡️ Admin"
                            : "👤 User"}
                        </span>

                      </td>


                      {/* Actions */}

                      <td>

                        {isCurrentUser ? (

                          <span className="text-muted">
                            Current account
                          </span>

                        ) : (

                          <>

                            {/* Role */}

                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() =>
                                handleRoleChange(
                                  user._id,
                                  user.role
                                )
                              }
                            >
                              {user.role === "admin"
                                ? "👤 Make User"
                                : "🛡️ Make Admin"}
                            </button>


                            {/* Delete */}

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDeleteUser(
                                  user._id
                                )
                              }
                            >
                              🗑️ Delete
                            </button>

                          </>

                        )}

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default UserManagement;