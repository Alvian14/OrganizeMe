import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getUser } from "../../_services/auth";

export default function AccountInfoPageAdmin() {
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        Image: null,
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [usersData] = await Promise.all([
                getUser()
            ]);
            setUsers(usersData);
            setFormData({
                username: usersData.username,
                email: usersData.email,
                image: usersData.image,
                _method: "PUT",
            })
        };
        fetchData();
    });



    return (
        <div className="p-4">
            <Card className="shadow border-0 rounded-4">
                <Card.Body>
                    <h4 className="fw-bold mb-4">⚙️ Account Settings</h4>

                    <div className="mb-3 d-flex gap-2">
                        <Button
                            variant={
                                activeTab === "profile"
                                    ? "primary"
                                    : "outline-primary"
                            }
                            onClick={() => {
                                setActiveTab("profile");
                                setMessage("");
                            }}
                        >
                            Profil
                        </Button>
                        <Button
                            variant={
                                activeTab === "password"
                                    ? "primary"
                                    : "outline-primary"
                            }
                            onClick={() => {
                                setActiveTab("password");
                                setMessage("");
                            }}
                        >
                            Ganti Password
                        </Button>
                    </div>

                    {/* {message && <Alert variant="info">{message}</Alert>} */}

                    {/* === FORM PROFIL === */}
                    {activeTab === "profile" && (
                        <Form onSubmit="">
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            name="username"
                                            value={formData.username}
                                            onChange= ""
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
                                              value=""
                                              onChange=""
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group
                                controlId="profilePicture"
                                className="mb-3"
                            >
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profilePicture"
                                    onChange=""
                                    accept="image/*"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill px-4"
                            >
                                Simpan Perubahan
                            </Button>
                        </Form>
                    )}

                    {/* === FORM GANTI PASSWORD === */}
                    {activeTab === "password" && (
                        <Form onSubmit="">
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password Baru</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password baru"
                                            name="password"
                                              value=""
                                              onChange=""
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>
                                            Konfirmasi Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Ulangi password"
                                            name="confirmPassword"
                                            value=""
                                            onChange=""
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill px-4"
                            >
                                Simpan Password
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
