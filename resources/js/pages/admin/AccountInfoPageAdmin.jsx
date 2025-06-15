import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { updateUser } from "../../_services/auth";

export default function AccountInfoPageAdmin() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [users, setUsers] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    // Form data untuk profile
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        _method: "PUT",
    });

    // Form data untuk password
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: "",
        _method: "PUT",
    });

    useEffect(() => {
        // Gunakan data dari localStorage userInfo
        if (userInfo) {
            console.log("User info from localStorage:", userInfo);
            setUsers(userInfo);
            setFormData({
                username: userInfo.username || "",
                email: userInfo.email || "",
                _method: "PUT",
            });
        } else {
            setMessage("User tidak ditemukan. Silakan login kembali.");
        }
    }, []);

    // Handle perubahan input untuk profile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle perubahan input untuk password
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit form profile
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Gunakan ID dari userInfo
            const response = await updateUser(userInfo.id, formData);
            setMessage("Profile berhasil diperbarui!");

            // Update users state dengan data terbaru
            setUsers(prev => ({
                ...prev,
                username: formData.username,
                email: formData.email
            }));

            // Update localStorage userInfo juga
            const updatedUserInfo = {
                ...userInfo,
                username: formData.username,
                email: formData.email
            };
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        } catch (error) {
            setMessage("Gagal memperbarui profile: " + (error.message || "Unknown error"));
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    // Submit form password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Validasi password
        if (passwordData.password !== passwordData.confirmPassword) {
            setMessage("Password dan konfirmasi password tidak cocok!");
            setLoading(false);
            return;
        }

        if (passwordData.password.length < 6) {
            setMessage("Password minimal 6 karakter!");
            setLoading(false);
            return;
        }

        try {
            const dataToSend = {
                password: passwordData.password,
                password_confirmation: passwordData.confirmPassword,
                _method: "PUT"
            };

            await updateUser(userInfo.id, dataToSend);
            setMessage("Password berhasil diperbarui!");

            // Reset form password
            setPasswordData({
                password: "",
                confirmPassword: "",
                _method: "PUT",
            });

        } catch (error) {
            setMessage("Gagal memperbarui password: " + (error.message || "Unknown error"));
            console.error("Error updating password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <Card className="shadow border-0 rounded-4">
                <Card.Body>
                    <h4 className="fw-bold mb-4">⚙️ Account Settings</h4>

                    {message && (
                        <Alert
                            variant={message.includes("berhasil") ? "success" : "danger"}
                            className="mb-3"
                        >
                            {message}
                        </Alert>
                    )}

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
                        <Form onSubmit={handleProfileSubmit}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
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
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill px-4"
                                disabled={loading}
                            >
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </Form>
                    )}

                    {/* === FORM GANTI PASSWORD === */}
                    {activeTab === "password" && (
                        <Form onSubmit={handlePasswordSubmit}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password Baru</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password baru (minimal 6 karakter)"
                                            name="password"
                                            value={passwordData.password}
                                            onChange={handlePasswordChange}
                                            required
                                            disabled={loading}
                                            minLength={6}
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
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            required
                                            disabled={loading}
                                            minLength={6}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill px-4"
                                disabled={loading}
                            >
                                {loading ? "Menyimpan..." : "Simpan Password"}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
