import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Container,
} from "react-bootstrap";
import {
  Calendar,
  BellFill,
  CheckCircleFill,
  ClockFill,
  XCircleFill,
  ImageFill,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    title : null,
    date : null,
    priority : 1,
    description : null,
    image : null,
    status: 1,
    category: 1
  })

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };


  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.category || formData.date === null || !formData.title || !formData.description) {
      return alert( "Please fill all the fields" );
    } 


    const user = JSON.parse(localStorage.getItem("userInfo"));
    const payload = new FormData();
    console.log(user.data);
    payload.append("title", formData.title);
    payload.append('deadline', formData.date);
    payload.append('priority_id', formData.priority);
    payload.append('description', formData.description);
    payload.append('category_id', formData.category);
    payload.append('status_id', formData.status);
    payload.append('user_id', user.id);
    
    if (selectedImage) payload.append('image', selectedImage);

    try {
      
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        body:payload,
      });

      if (!response.ok) throw new Error('Submission Failed');

      const data = await response.json();
      alert("Task Saved", data);
      handleClose();
    } catch (error) {
      console.log(error);
      alert("Error Saving task");
    }

    


    
  }

  return (
    <Container fluid className="bg-light p-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search your task here..."
          style={{ maxWidth: "400px" }}
        />
        <div className="d-flex align-items-center gap-3">
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

      {/* Task Overview */}
      <Card className="mb-5 shadow border-0 rounded-4">
        <Card.Body className="text-center">
          <h4 className="fw-bold text-primary mb-4">
            <Calendar className="me-2" />
            Task Overview
          </h4>
          <div className="d-flex justify-content-around flex-wrap gap-4">
            {[
              {
                label: "Not Started",
                count: 12,
                color: "danger",
                icon: <XCircleFill size={48} />,
              },
              {
                label: "In Progress",
                count: 8,
                color: "warning",
                icon: <ClockFill size={48} />,
              },
              {
                label: "Completed",
                count: 20,
                color: "success",
                icon: <CheckCircleFill size={48} />,
              },
            ].map(({ label, count, color, icon }) => (
              <div
                key={label}
                className="flex-grow-1 text-center p-3 rounded-4"
                style={{ backgroundColor: "#f8f9fa", minWidth: "200px" }}
              >
                <div className={`text-${color} mb-2`}>{icon}</div>
                <h2 className={`fw-bold text-${color}`}>{count}</h2>
                <h6 className="text-muted">{label}</h6>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Tasks Section */}
      <div className="row g-4">
        {/* To-Do Tasks */}
        <div className="col-md-6">
          <Card className="shadow rounded-4 border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-primary fw-bold">
                  <BellFill className="me-2" />
                  To-Do Tasks
                </h5>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleShow}
                  className="rounded-pill px-4"
                >
                  + Add Task
                </Button>
              </div>

              <div className="mb-3 p-3 rounded bg-white shadow-sm border">
                <h6 className="fw-semibold text-danger mb-1">
                  <BellFill className="me-2" size={18} />
                  Buy groceries
                </h6>
                <p className="text-secondary small">
                  Pick up vegetables, rice, and fruits.
                </p>
                <Badge bg="danger" className="me-2">
                  High
                </Badge>
                <Badge bg="secondary">Not Started</Badge>
                <small className="d-block text-muted mt-2">Due: 09/06/2025</small>
              </div>

              <div className="p-3 rounded bg-white shadow-sm border">
                <h6 className="fw-semibold text-warning mb-1">
                  <ClockFill className="me-2" size={18} />
                  Frontend Review
                </h6>
                <p className="text-secondary small">Review UI/UX with the team.</p>
                <Badge bg="warning" className="me-2 text-dark">
                  Medium
                </Badge>
                <Badge bg="primary">In Progress</Badge>
                <small className="d-block text-muted mt-2">Due: 08/06/2025</small>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Completed Tasks */}
        <div className="col-md-6">
          <Card className="shadow rounded-4 border-0 h-100">
            <Card.Body>
              <h5 className="text-success fw-bold mb-4">
                <CheckCircleFill className="me-2" />
                Completed Tasks
              </h5>

              <div className="mb-3 p-3 rounded bg-white shadow-sm border">
                <h6 className="fw-semibold text-success mb-1">
                  <CheckCircleFill className="me-2" size={18} />
                  Finalize Proposal
                </h6>
                <p className="text-secondary small">Submitted to the client.</p>
                <Badge bg="success">Completed</Badge>
                <small className="d-block text-muted mt-2">Done: 05/06/2025</small>
              </div>

              <div className="p-3 rounded bg-white shadow-sm border">
                <h6 className="fw-semibold text-success mb-1">
                  <CheckCircleFill className="me-2" size={18} />
                  Morning Jogging
                </h6>
                <p className="text-secondary small">Jogged 5KM in the park.</p>
                <Badge bg="success">Completed</Badge>
                <small className="d-block text-muted mt-2">Done: 06/06/2025</small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <ImageFill className="me-2" />
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter task title" 
              name="title" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control 
              type="date" 
              name="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <div>
                <Form.Check 
                inline 
                label="Low" 
                name="priority" 
                type="radio" 
                id="low"
                value={1} 
                checked={formData.priority === 1} 
                onChange={e => setFormData({...formData, priority: Number(e.target.value)})}/>                
                <Form.Check 
                inline 
                label="Medium" 
                name="priority" 
                type="radio" 
                id="medium" 
                value={2}
                checked={formData.priority === 2} 
                onChange={e => setFormData({...formData, priority: Number(e.target.value)})}/>
                <Form.Check 
                inline 
                label="High" 
                name="priority" 
                type="radio" 
                id="high"
                value={3} 
                checked={formData.priority === 3} 
                onChange={e => setFormData({...formData, priority: Number(e.target.value)})}/>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <div>
                <Form.Check 
                inline 
                value={1}
                label="Daily" 
                name="category" 
                type="radio" 
                id="daily" 
                checked={formData.category === 1} 
                onChange={e => setFormData({...formData, category: Number(e.target.value)})}/>                
                <Form.Check 
                inline 
                value={2}
                label="Weekly" 
                name="category" 
                type="radio" 
                id="weekly" 
                checked={formData.category === 2} 
                onChange={e => setFormData({...formData, category: Number(e.target.value)})}/>
                <Form.Check 
                inline 
                value={3}
                label="Monthly" 
                name="category" 
                type="radio" 
                id="monthly" 
                checked={formData.category === 3} 
                onChange={e => setFormData({...formData, category: Number(e.target.value)})}/>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
              as="textarea" 
              name="description" 
              rows={3} 
              placeholder="Write details..." 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image (optional)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            {selectedImage && (
              <div className="text-center mb-3">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}
            <div>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Task
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskDashboard;
