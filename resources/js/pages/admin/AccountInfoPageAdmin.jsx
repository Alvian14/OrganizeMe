import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function AccountInfoPageAdmin() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return setMessage("Password dan konfirmasi tidak cocok.");
    }

    // Simulasikan pengiriman ke backend
    console.log("Data disimpan:", formData);
    setMessage("Profil berhasil diperbarui!");
  };

  return (
    <div className="p-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          <h4 className="fw-bold mb-4">⚙️ Account Settings</h4>

          {message && <Alert variant="info">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Leave blank if unchanged"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="profilePicture" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                onChange={handleChange}
                accept="image/*"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-3 rounded"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="rounded-pill px-4">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
