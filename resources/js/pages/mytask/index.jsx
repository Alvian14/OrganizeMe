import React from "react";
import { Card, Button } from "react-bootstrap";
import { Folder, Calendar, Trash, Pencil } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const MyTaskPage = () => {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
      <div className="flex-grow-1 p-4">
        {/* Header: Search & Icons */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <input
            type="text"
            className="form-control w-100 w-md-50"
            placeholder="Search your task here..."
            style={{ maxWidth: "400px" }}
          />
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-secondary"
              className="shadow-sm rounded-circle p-2 d-flex justify-content-center align-items-center"
              style={{ width: 42, height: 42 }}
              title="Folders"
            >
              <Folder size={20} />
            </Button>
            <Button
              variant="outline-secondary"
              className="shadow-sm rounded-circle p-2 d-flex justify-content-center align-items-center"
              style={{ width: 42, height: 42 }}
              title="Calendar"
            >
              <Calendar size={20} />
            </Button>
            <div className="text-end">
              <strong className="d-block">Tuesday</strong>
              <small className="text-muted">20/06/2023</small>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Task List */}
          <div className="col-md-6">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold mb-4 text-danger">My Tasks</h5>

                <div className="border p-3 rounded mb-3 bg-white shadow-sm">
                  <h6 className="text-danger">Submit Documents</h6>
                  <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                    Make sure to submit all the necessary documents...
                  </p>
                  <small className="text-muted">
                    Priority: <span className="text-danger">Extreme</span> | Status: <span className="text-danger">Not Started</span> | Created on: 20/06/2023
                  </small>
                </div>

                <div className="border p-3 rounded bg-white shadow-sm">
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
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold text-danger">Submit Documents</h5>
                <p className="mb-1 text-muted">Priority: <span className="text-danger">Extreme</span></p>
                <p className="mb-1 text-muted">Status: <span className="text-danger">Not Started</span></p>
                <p className="mb-3 text-muted">Created on: 20/06/2023</p>

                <p><strong>Task Title:</strong> Document Submission.</p>
                <p><strong>Objective:</strong> To submit required documents for something important.</p>
                <p>
                  <strong>Task Description:</strong> Review the list of documents required for submission and ensure all necessary documents are ready. Organize the documents accordingly and scan them if physical copies need to be submitted digitally. Rename the scanned files appropriately for easy identification and verify the accepted file formats. Upload the documents securely to the designated platform, double-check for accuracy, and obtain confirmation of successful submission. Follow up if necessary to ensure proper processing.
                </p>

                <p><strong>Additional Notes:</strong></p>
                <ul>
                  <li>Ensure that the documents are authentic and up-to-date.</li>
                  <li>Maintain confidentiality and security of sensitive information during the submission process.</li>
                  <li>If there are specific guidelines or deadlines for submission, adhere to them diligently.</li>
                </ul>

                <p><strong>Deadline for Submission:</strong> End of Day</p>

                <div className="d-flex gap-3 mt-3">
                  <Button variant="danger" title="Delete Task" className="d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
                    <Trash size={18} />
                  </Button>
                  <Button variant="warning" title="Edit Task" className="d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
                    <Pencil size={18} />
                  </Button>
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
