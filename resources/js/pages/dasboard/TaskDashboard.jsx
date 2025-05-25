import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex">
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

        {/* Task Status */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Body className="text-center">
            <h5 className="text-danger mb-4">Task Status</h5>
            <div className="d-flex justify-content-around">
              <div>
                <h4>40</h4>
                <p>Completed</p>
              </div>
              <div>
                <h4>46</h4>
                <p>In Progress</p>
              </div>
              <div>
                <h4>46</h4>
                <p>Not Started</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <div className="row">
          {/* To-Do Section */}
          <div className="col-md-6">
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="text-danger">To-Do</h6>
                  <Button variant="link" className="text-decoration-none text-muted" onClick={handleShow}>+ Add task</Button>
                </div>
                {/* <div className="mb-3 border rounded p-3">
                  <p className="mb-1 fw-bold text-dark">🔴 Attend Nischal's Birthday Party</p>
                  <p className="mb-1">Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)</p>
                  <small className="text-muted">Priority: Moderate | Status: Not Started | Created on: 20/06/2023</small>
                </div>
                <div className="border rounded p-3">
                  <p className="mb-1 fw-bold text-dark">🔵 Landing Page Design for TravelDays</p>
                  <p className="mb-1">Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)</p>
                  <small className="text-muted">Priority: Moderate | Status: In Progress | Created on: 20/06/2023</small>
                </div> */}
              </Card.Body>
            </Card>
          </div>

          {/* Completed Task Section */}
          <div className="col-md-6">
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h6 className="text-muted mb-3">✅ Completed Task</h6>
                {/* <div className="mb-3 border rounded p-3">
                  <p className="mb-1 fw-bold text-dark">🟢 Walk the dog</p>
                  <p className="mb-1">Take the dog to the park and bring treats as well.</p>
                  <small className="text-success">Status: Completed | Completed 2 days ago</small>
                </div>
                <div className="border rounded p-3">
                  <p className="mb-1 fw-bold text-dark">🟢 Conduct meeting</p>
                  <p className="mb-1">Meet with the client and finalize requirements.</p>
                  <small className="text-success">Status: Completed | Completed 2 days ago</small>
                </div> */}
              </Card.Body>
            </Card>
          </div>
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