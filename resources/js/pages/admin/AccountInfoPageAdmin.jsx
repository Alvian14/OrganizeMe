import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getUser, showUser } from "../../_services/auth";
import { useParams } from "react-router-dom";

export default function AccountInfoPageAdmin() {
    const {id} = useParams();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [usersData]  = await showUser(id);
            setUsers(usersData);
            setFormData({
                username: usersData.username,
                email: usersData.email,
                _method: "PUT",
            })
        };
        fetchData();
    }, [id]);



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
                                            value={userInfo.username}
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
                                              value={userInfo.email}
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
