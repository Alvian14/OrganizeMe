import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

const MyTaskPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-secondary text-white p-4" style={{ width: "250px", minHeight: "100vh" }}>
        <div className="text-center mb-4">
          <img src="https://via.placeholder.com/100" alt="Profile" className="rounded-circle" />
          <h5 className="mt-2">OrMe</h5>
          <p className="text-light">OrMe@gmail.com</p>
        </div>
        <ul className="list-unstyled">
          <li className="mb-3">📊 Dashboard</li>
          <li className="mb-3 bg-light text-dark p-2 rounded fw-bold">✅ My Task</li>
          <li className="mb-3">📂 Task Categories</li>
          <li className="mb-3">⚙️ Settings</li>
          <li className="mb-3">🔓 Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <input type="text" className="form-control w-50 me-3" placeholder="Search your task here..." />
          <div className="d-flex align-items-center">
            <Button variant="outline-secondary" className="me-2">📁</Button>
            <Button variant="outline-secondary" className="me-2">📅</Button>
            <div className="text-end">
              <strong>Tuesday</strong><br />
              <small className="text-muted">20/06/2023</small>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Task List */}
          <div className="col-md-6">
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold mb-4 text-danger">My Tasks</h5>

                <div className="border p-3 rounded mb-3 bg-white">
                  <h6 className="text-danger">Submit Documents</h6>
                  <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                    Make sure to submit all the necessary documents...
                  </p>
                  <small className="text-muted">
                    Priority: <span className="text-danger">Extreme</span> | Status: <span className="text-danger">Not Started</span> | Created on: 20/06/2023
                  </small>
                </div>

                <div className="border p-3 rounded bg-white">
                  <h6 className="text-primary">Complete assignments</h6>
                  <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                    The assignments must be completed to pass final year...
                  </p>
                  <small className="text-muted">
                    Priority: <span className="text-warning">Moderate</span> | Status: <span className="text-primary">In Progress</span> | Created on: 20/06/2023
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Task Details */}
          <div className="col-md-6">
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold text-danger">Submit Documents</h5>
                <p className="mb-1 text-muted">Priority: <span className="text-danger">Extreme</span></p>
                <p className="mb-1 text-muted">Status: <span className="text-danger">Not Started</span></p>
                <p className="mb-3 text-muted">Created on: 20/06/2023</p>

                <p><strong>Task Title:</strong> Document Submission.</p>
                <p><strong>Objective:</strong> To submit required documents for something important</p>
                <p><strong>Task Description:</strong> Review the list of documents required for submission and ensure all necessary documents are ready. Organize the documents accordingly and scan them if physical copies need to be submitted digitally. Rename the scanned files appropriately for easy identification and verify the accepted file formats. Upload the documents securely to the designated platform, double-check for accuracy, and obtain confirmation of successful submission. Follow up if necessary to ensure proper processing.</p>

                <p><strong>Additional Notes:</strong></p>
                <ul>
                  <li>Ensure that the documents are authentic and up-to-date.</li>
                  <li>Maintain confidentiality and security of sensitive information during the submission process.</li>
                  <li>If there are specific guidelines or deadlines for submission, adhere to them diligently.</li>
                </ul>

                <p><strong>Deadline for Submission:</strong> End of Day</p>

                <div className="d-flex gap-2 mt-3">
                  <Button variant="danger"><FaTrash /></Button>
                  <Button variant="warning"><FaEdit /></Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTaskPage;
