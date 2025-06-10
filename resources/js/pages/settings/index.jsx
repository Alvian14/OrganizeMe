import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountInfoPage = () => {
  return (
    <div className="bg-light p-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-3"
          placeholder="Search your task here..."
        />
        <div className="d-flex align-items-center">
          <Button variant="outline-danger" className="me-2">🔔</Button>
          <Button variant="outline-danger" className="me-2">📅</Button>
          <div className="text-end">
            <strong>Tuesday</strong><br />
            <small className="text-primary">20/06/2023</small>
          </div>
        </div>
      </div>

      {/* Account Info + Password Form */}
      <Card className="shadow border-0 p-4">
        <Card.Body>
          <h4 className="fw-bold border-bottom pb-3 mb-4">👤 Account Information</h4>

          {/* Profile Info */}
          <div className="d-flex align-items-center mb-4">
            <div style={{ fontSize: "60px" }}>🧑🏻</div>
            <div className="ms-3">
              <h5 className="mb-1">OrMe</h5>
              <small className="text-muted">OrME@gmail.com</small>
            </div>
          </div>

          <Form>
            {/* Nama & Email */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter contact number" />
                </Form.Group>
              </Col>
            </Row>

            {/* Jabatan */}
            <Form.Group className="mb-4">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Enter position" />
            </Form.Group>

            {/* Password Section */}
            <h5 className="fw-semibold mt-5 mb-3 text-danger">🔐 Change Password (optional)</h5>

            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter current password" />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password" />
                </Form.Group>
              </Col>
            </Row>

            {/* Tombol */}
            <div className="d-flex gap-2">
              <Button variant="primary">Update Info</Button>
              <Button variant="outline-secondary">Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccountInfoPage;
