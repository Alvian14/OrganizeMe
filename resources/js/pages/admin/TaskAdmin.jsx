import React from "react";
import { Table, Card, Badge, Button } from "react-bootstrap";
import { BsClipboardCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TaskAdmin() {
  const navigate = useNavigate();

  // Simulasi data user
  const users = [
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      status: "In Progress",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      status: "Completed",
    },
    {
      id: 3,
      username: "user3",
      email: "user3@example.com",
      status: "Not Started",
    },
  ];

  // Fungsi untuk styling badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "In Progress":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "Not Started":
        return <Badge bg="secondary">{status}</Badge>;
      default:
        return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  return (
    <div className="p-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h4 className="fw-bold d-flex align-items-center gap-2">
                <BsClipboardCheck className="text-primary" size={24} />
                My Task
              </h4>
              <p className="text-muted mb-0">View and manage all your task progress</p>
            </div>
            <Button variant="primary" className="rounded-pill px-4 shadow-sm">
              + Add Task
            </Button>
          </div>

          {/* Table */}
          <div className="table-responsive rounded-3 overflow-hidden">
            <Table hover bordered className="mb-0 align-middle">
              <thead className="bg-primary text-white text-center">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-center fw-bold">{index + 1}</td>

                    {/* Klik username untuk navigate ke detail task */}
                    <td
                      onClick={() => navigate(`/admin/task-admin/${user.username}`)}
                      className="text-capitalize text-primary fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      {user.username}
                    </td>

                    <td>{user.email}</td>

                    <td className="text-center">
                      {getStatusBadge(user.status)}
                    </td>

                    <td className="text-center">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2 rounded-pill"
                      >
                        Edit Role
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
