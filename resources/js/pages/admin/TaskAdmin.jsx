import React from "react";
import { Table, Card, Badge } from "react-bootstrap";
import { BsClipboardCheck, BsExclamationCircle, BsCheckCircle, BsClock } from "react-icons/bs";

const dummyTasks = [
  {
    id: 1,
    title: "Create landing page",
    category: "Frontend",
    status: "In Progress",
    dueDate: "2025-06-15",
  },
  {
    id: 2,
    title: "Fix login bug",
    category: "Backend",
    status: "Completed",
    dueDate: "2025-06-10",
  },
  {
    id: 3,
    title: "Database optimization",
    category: "Database",
    status: "Pending",
    dueDate: "2025-06-20",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Completed":
      return (
        <Badge bg="success" className="d-flex align-items-center gap-1">
          <BsCheckCircle /> {status}
        </Badge>
      );
    case "In Progress":
      return (
        <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
          <BsClock /> {status}
        </Badge>
      );
    case "Pending":
      return (
        <Badge bg="secondary" className="d-flex align-items-center gap-1">
          <BsExclamationCircle /> {status}
        </Badge>
      );
    default:
      return <Badge bg="light">{status}</Badge>;
  }
};

export default function TaskAdmin() {
  return (
    <div className="p-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h4 className="fw-bold d-flex align-items-center gap-2">
                <BsClipboardCheck className="text-primary" /> My Task
              </h4>
              <p className="text-muted mb-0">View and manage all your task progress</p>
            </div>
          </div>

          <div className="table-responsive rounded-3 overflow-hidden">
            <Table bordered hover className="mb-0 align-middle">
              <thead className="bg-secondary text-white text-center">
                <tr>
                  <th>#</th>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.category}</td>
                    <td>{getStatusBadge(task.status)}</td>
                    <td>{task.dueDate}</td>
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
