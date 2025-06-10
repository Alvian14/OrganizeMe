import React, { useState } from "react";
import { Card, Badge, Modal, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BsCardChecklist, BsInfoCircle } from "react-icons/bs";

export default function UserTaskDetail() {
  const { username } = useParams();

  const tasks = [
    {
      id: 1,
      title: "Login Page",
      status: "To Do",
      description: "Buat halaman login dengan validasi form.",
    },
    {
      id: 2,
      title: "Dashboard Layout",
      status: "Doing",
      description: "Susun tampilan layout admin dan user secara dinamis.",
    },
    {
      id: 3,
      title: "API Integration",
      status: "Done",
      description: "Hubungkan form dengan endpoint backend dan testing API.",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "To Do":
        return <Badge bg="secondary">To Do</Badge>;
      case "Doing":
        return <Badge bg="warning" text="dark">Doing</Badge>;
      case "Done":
        return <Badge bg="success">Done</Badge>;
      default:
        return <Badge bg="light">Unknown</Badge>;
    }
  };

  return (
    <div className="p-3 p-md-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
            <div className="d-flex align-items-center gap-2 mb-3 mb-md-0">
              <BsCardChecklist size={24} className="text-primary" />
              <h4 className="fw-bold mb-0">Task Detail for <span className="text-info">{username}</span></h4>
            </div>
          </div>

          <Row className="g-3">
            {tasks.map((task) => (
              <Col md={6} lg={4} key={task.id}>
                <Card
                  onClick={() => handleTaskClick(task)}
                  className="shadow-sm rounded-4 h-100 border border-light cursor-pointer"
                  style={{ cursor: "pointer", transition: "all 0.3s ease-in-out" }}
                >
                  <Card.Body>
                    <h6 className="fw-semibold">{task.title}</h6>
                    <p className="text-muted small mb-2">
                      {task.description.length > 50
                        ? task.description.slice(0, 50) + "..."
                        : task.description}
                    </p>
                    {renderStatus(task.status)}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Modal Detail Tugas */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="d-flex align-items-center gap-2">
            <BsInfoCircle /> Detail Tugas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <h5 className="fw-bold">{selectedTask.title}</h5>
              <p className="text-muted">{selectedTask.description}</p>
              <div>Status: {renderStatus(selectedTask.status)}</div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
