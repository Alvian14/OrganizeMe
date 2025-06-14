import React, { useState, useEffect } from "react";
import { Card, Badge, Modal, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BsCardChecklist, BsInfoCircle } from "react-icons/bs";
import { getTasksByUserId } from "../../_services/tasks";


export default function UserTaskDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks dari API
   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByUserId(id); // pake service
        setTasks(data);
      } catch (error) {
        console.error("Gagal mengambil data task:", error);
      }
    };

    fetchTasks();
  }, [id]);

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
              <h4 className="fw-bold mb-0">Task Detail</h4>
            </div>
          </div>

          <Row className="g-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
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
              ))
            ) : (
              <p className="text-muted">Tidak ada task ditemukan.</p>
            )}
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
