import React from "react";
import { Button } from "react-bootstrap";

function TableUser({ data, handleEdit, handleDelete, handleBanUser }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead className="text-primary">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={user.status === "active" ? "secondary" : "success"}
                      onClick={() => handleBanUser(user._id, user.status === "active" ? "inactive" : "active")}
                    >
                      {user.status === "active" ? "Ban" : "Unban"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableUser;
