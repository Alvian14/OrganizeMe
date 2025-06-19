import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Container,
  Spinner,
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
import { insertTask, getTasksByUserId, getCategories } from "../../_services/tasks";
import { API, bookImageStorage } from "../../_api";

const TaskDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    priority_id: "",
    status_id: "",
    user_id: "",
    category_id: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Tambah state error
  const [tasks, setTasks] = useState([]);
  const [overview, setOverview] = useState({
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  });
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const searchTimeout = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  // Ambil userId dari localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userId = userInfo.id || "";

  useEffect(() => {
    if (userId) {
      getTasksByUserId(userId).then((data) => {
        setTasks(data || []);
        // Hitung jumlah berdasarkan status_id
        setOverview({
          notStarted: (data || []).filter(t => String(t.status_id) === "1").length,
          inProgress: (data || []).filter(t => String(t.status_id) === "2").length,
          completed: (data || []).filter(t => String(t.status_id) === "3").length,
        });
      }).catch(error => {
        console.error("Error fetching tasks:", error);
      });
    }
  }, [showModal, userId]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoriesError("");
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoriesError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle search input with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  const handleShow = () => {
    // Ambil userInfo dari localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setForm((prev) => ({
      ...prev,
      user_id: userInfo.id || "",
    }));
    setError(""); // Reset error saat modal dibuka
    setShowModal(true);
  };

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
  // Handle input form
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] }));
      handleImageChange(e);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle radio
  const handlePriorityChange = (e) => {
    setForm((prev) => ({ ...prev, priority_id: e.target.value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!form.category_id) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      // Pastikan semua field dikirim sebagai string (bukan undefined/null)
      const formData = new FormData();
      formData.append("title", form.title || "");
      formData.append("description", form.description || "");
      formData.append("deadline", form.deadline || "");
      formData.append("priority_id", form.priority_id || "");
      formData.append("status_id", form.status_id || "");
      formData.append("user_id", form.user_id || "");
      formData.append("category_id", form.category_id || "");
      if (form.image) formData.append("image", form.image);

      await insertTask(formData);

      // Reset form and close modal
      setForm({
        title: "",
        description: "",
        deadline: "",
        priority_id: "",
        status_id: "",
        user_id: "",
        category_id: "",
        image: null,
      });
      setSelectedImage(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating task:", err);

      // Handle validation errors
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join(" | ");
        setError(errorMessages);
      } else if (err.response?.status === 404) {
        setError(err.response.data.message || "Resource not found");
      } else if (err.response?.status === 401) {
        setError("Authentication required. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to create task. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="bg-light p-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search your task here..."
          style={{ maxWidth: "400px" }}
          value={searchValue}
          onChange={handleSearchChange}
        />
        <div className="d-flex align-items-center gap-3">
            <Button
            variant="outline-secondary"
            className="shadow-sm rounded-circle p-2 d-flex justify-content-center align-items-center"
            style={{ width: 42, height: 42 }}
            title="Calendar"
            disabled
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
          <h4 className="fw-bold text-dark mb-4">
            <Calendar className="me-2" />
            Task Overview
          </h4>
          <div className="d-flex justify-content-around flex-wrap gap-4">
            <div
              className="flex-grow-1 text-center p-3 rounded-4"
              style={{ backgroundColor: "#f8f9fa", minWidth: "200px" }}
            >
              <div className="text-secondary mb-2"><XCircleFill size={48} /></div>
              <h2 className="fw-bold text-secondary">{overview.notStarted}</h2>
              <h6 className="text-muted">Not Started</h6>
            </div>
            <div
              className="flex-grow-1 text-center p-3 rounded-4"
              style={{ backgroundColor: "#f8f9fa", minWidth: "200px" }}
            >
              <div className="text-primary mb-2"><ClockFill size={48} /></div>
              <h2 className="fw-bold text-primary">{overview.inProgress}</h2>
              <h6 className="text-muted">In Progress</h6>
            </div>
            <div
              className="flex-grow-1 text-center p-3 rounded-4"
              style={{ backgroundColor: "#f8f9fa", minWidth: "200px" }}
            >
              <div className="text-success mb-2"><CheckCircleFill size={48} /></div>
              <h2 className="fw-bold text-success">{overview.completed}</h2>
              <h6 className="text-muted">Completed</h6>
            </div>
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

              {/* Tampilkan task dengan status_id 1 (Not Started) dan 2 (In Progress) */}
              {tasks
                .filter(
                  (t) =>
                    (String(t.status_id) === "1" || String(t.status_id) === "2") &&
                    (
                      t.title?.toLowerCase().includes(search.toLowerCase()) ||
                      t.description?.toLowerCase().includes(search.toLowerCase())
                    )
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="border rounded-3 p-3 mb-3 bg-white"
                  >
                    {task.image && (
                      <div className="mb-2">
                        <img
                          src={`${bookImageStorage}${task.image}`}
                          alt={task.title}
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                        />
                      </div>
                    )}
                    <h6 className="fw-semibold text-primary mb-1">
                      <BellFill className="me-2" size={18} />
                      {task.title}
                    </h6>
                    <p className="text-secondary small">{task.description}</p>
                    <Badge bg={
                      String(task.status_id) === "2"
                        ? "warning"
                        : "secondary"
                    } className="me-2">
                      {String(task.status_id) === "2"
                        ? "In Progress"
                        : "Not Started"}
                    </Badge>
                    <Badge bg={
                      String(task.priority_id) === "3"
                        ? "danger"
                        : String(task.priority_id) === "2"
                        ? "warning text-dark"
                        : "secondary"
                    }>
                      {String(task.priority_id) === "3"
                        ? "High"
                        : String(task.priority_id) === "2"
                        ? "Medium"
                        : "Low"}
                    </Badge>
                    <small className="d-block text-muted mt-2">
                      Due: {task.deadline ? task.deadline.split(" ")[0] : ""}
                    </small>
                  </div>
                ))}
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

              {/* Tampilkan task dengan status_id 3 */}
              {tasks
                .filter(
                  (t) =>
                    String(t.status_id) === "3" &&
                    (
                      t.title?.toLowerCase().includes(search.toLowerCase()) ||
                      t.description?.toLowerCase().includes(search.toLowerCase())
                    )
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="border rounded-3 p-3 mb-3 bg-white"
                  >
                    {task.image && (
                      <div className="mb-2">
                        <img
                          src={`${bookImageStorage}${task.image}`}
                          alt={task.title}
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                        />
                      </div>
                    )}
                    <h6 className="fw-semibold text-success mb-1">
                      <CheckCircleFill className="me-2" size={18} />
                      {task.title}
                    </h6>
                    <p className="text-secondary small">{task.description}</p>
                    <Badge bg="success" className="me-2">Completed</Badge>
                    <Badge bg={
                      String(task.priority_id) === "3"
                        ? "danger"
                        : String(task.priority_id) === "2"
                        ? "warning text-dark"
                        : "secondary"
                    }>
                      {String(task.priority_id) === "3"
                        ? "High"
                        : String(task.priority_id) === "2"
                        ? "Medium"
                        : "Low"}
                    </Badge>
                    <small className="d-block text-muted mt-2">
                      Due: {task.deadline ? task.deadline.split(" ")[0] : ""}
                    </small>
                  </div>
                ))}
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
            {/* Tampilkan error jika ada */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />
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
                  value="1"
                  checked={form.priority_id === "1"}
                  onChange={handlePriorityChange}
                />
                <Form.Check
                  inline
                  label="Medium"
                  name="priority"
                  type="radio"
                  id="medium"
                  value="2"
                  checked={form.priority_id === "2"}
                  onChange={handlePriorityChange}
                />
                <Form.Check
                  inline
                  label="High"
                  name="priority"
                  type="radio"
                  id="high"
                  value="3"
                  checked={form.priority_id === "3"}
                  onChange={handlePriorityChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Not Started"
                  name="status"
                  type="radio"
                  id="status-notstarted"
                  value="1"
                  checked={form.status_id === "1"}
                  onChange={e => setForm(prev => ({ ...prev, status_id: e.target.value }))}
                />
                <Form.Check
                  inline
                  label="In Progress"
                  name="status"
                  type="radio"
                  id="status-inprogress"
                  value="2"
                  checked={form.status_id === "2"}
                  onChange={e => setForm(prev => ({ ...prev, status_id: e.target.value }))}
                />
                <Form.Check
                  inline
                  label="Completed"
                  name="status"
                  type="radio"
                  id="status-completed"
                  value="3"
                  checked={form.status_id === "3"}
                  onChange={e => setForm(prev => ({ ...prev, status_id: e.target.value }))}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              {isLoadingCategories ? (
                <div className="text-center py-2">
                  <Spinner animation="border" size="sm" /> Loading categories...
                </div>
              ) : categoriesError ? (
                <div className="text-danger small">{categoriesError}</div>
              ) : (
                <Form.Select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                  disabled={isLoadingCategories}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            {/* user_id hidden */}
            <Form.Control
              type="hidden"
              name="user_id"
              value={form.user_id}
              readOnly
            />

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write details..."
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
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

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Task"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskDashboard;
