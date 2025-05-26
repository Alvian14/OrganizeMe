import React, { useState } from "react";
import { Card, Button, Modal, Form, Badge } from "react-bootstrap";
import { Folder, Calendar, BellFill, CheckCircleFill, ClockFill, XCircleFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex flex-column flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
      {/* Header */}
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
            title="Folders">
            <Folder size={20} />
          </Button>
          <Button
            variant="outline-secondary"
            className="shadow-sm rounded-circle p-2 d-flex justify-content-center align-items-center"
            style={{ width: 42, height: 42 }}
            title="Calendar">
            <Calendar size={20} />
          </Button>
          <div className="text-end">
            <strong className="d-block">Tuesday</strong>
            <small className="text-muted">20/06/2023</small>
          </div>
        </div>
      </div>

      {/* Task Status */}
      <Card className="mb-5 shadow rounded-4 border-0">
        <Card.Body className="text-center">
          <h4 className="text-primary mb-4 fw-bold">Task Status</h4>
          <div className="d-flex justify-content-around">
            {[
              { label: "In Progress", count: 46, color: "warning", icon: <ClockFill size={28} /> },
              { label: "Completed", count: 40, color: "success", icon: <CheckCircleFill size={28} /> },
              { label: "Not Started", count: 46, color: "danger", icon: <XCircleFill size={28} /> },
            ].map(({ label, count, color, icon }) => (
              <div key={label} className="d-flex flex-column align-items-center">
                <div className={`text-${color} mb-2`}>{icon}</div>
                <h3 className={`text-${color} fw-bold`}>{count}</h3>
                <p className="text-muted">{label}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      <div className="row g-4">
        {/* To-Do Section */}
        <div className="col-md-6">
          <Card className="shadow rounded-4 border-0 h-100 d-flex flex-column">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-primary fw-bold">To-Do</h5>
                <Button variant="primary" size="sm" onClick={handleShow} className="rounded-pill px-4">
                  + Add task
                </Button>
              </div>

              {/* Example Task */}
              <div className="mb-3 p-3 border rounded bg-white shadow-sm">
                <h6 className="fw-semibold text-danger mb-1">
                  <BellFill className="me-2" size={20} />
                  Attend Nischal's Birthday Party
                </h6>
                <p className="mb-2 text-secondary small">
                  Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)
                </p>
                <Badge bg="danger" className="me-2">
                  Extreme Priority
                </Badge>
                <Badge bg="secondary">Not Started</Badge>
                <small className="d-block text-muted mt-2">Created on: 20/06/2023</small>
              </div>

              <div className="p-3 border rounded bg-white shadow-sm">
                <h6 className="fw-semibold text-warning mb-1">
                  <ClockFill className="me-2" size={20} />
                  Landing Page Design for TravelDays
                </h6>
                <p className="mb-2 text-secondary small">
                  Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)
                </p>
                <Badge bg="warning" className="me-2 text-dark">
                  Moderate Priority
                </Badge>
                <Badge bg="primary">In Progress</Badge>
                <small className="d-block text-muted mt-2">Created on: 20/06/2023</small>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Completed Task Section */}
        <div className="col-md-6">
          <Card className="shadow rounded-4 border-0 h-100 d-flex flex-column">
            <Card.Body>
              <h5 className="text-success fw-bold mb-4">Completed Task</h5>

              <div className="mb-3 p-3 border rounded bg-white shadow-sm">
                <h6 className="fw-semibold text-success mb-1">
                  <CheckCircleFill className="me-2" size={20} />
                  Walk the dog
                </h6>
                <p className="mb-2 text-secondary small">Take the dog to the park and bring treats as well.</p>
                <Badge bg="success">Completed</Badge>
                <small className="d-block text-muted mt-2">Completed 2 days ago</small>
              </div>

              <div className="p-3 border rounded bg-white shadow-sm">
                <h6 className="fw-semibold text-success mb-1">
                  <CheckCircleFill className="me-2" size={20} />
                  Conduct meeting
                </h6>
                <p className="mb-2 text-secondary small">Meet with the client and finalize requirements.</p>
                <Badge bg="success">Completed</Badge>
                <small className="d-block text-muted mt-2">Completed 2 days ago</small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter task title" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <div>
                <Form.Check inline label="Extreme" name="priority" type="radio" id="priority-extreme" />
                <Form.Check inline label="Moderate" name="priority" type="radio" id="priority-moderate" />
                <Form.Check inline label="Low" name="priority" type="radio" id="priority-low" />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Start writing here..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskDashboard;
