
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";



export default function Sidebar() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = () => {
        // Hapus token dari localStorage atau sessionStorage
        localStorage.removeItem("token"); // ganti sesuai penyimpanan token kamu
        setShowLogoutModal(false);
        // Redirect ke halaman login
        navigate("/");
    };

    return (

        <>
            <div
                className="bg-secondary text-white p-3"
                style={{
                    width: "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                }}
            >
                <div className="text-center mb-4">
                    <img
                        src="https://i.pravatar.cc/100"
                        className="rounded-circle"
                        alt="avatar"
                    />
                    <h5 className="mt-2 mb-0">OrMe</h5>
                    <small>OrMe@gmail.com</small>
                </div>



                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${
                                    isActive
                                        ? "bg-white text-dark rounded p-2"
                                        : "text-white"
                                }`
                            }
                        >
                            <i className="bi bi-grid-fill me-2" /> Dashboard
                        </NavLink>
                    </li>

                    <li className="nav-item mb-2">
                        <NavLink
                            to="/mytask"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${
                                    isActive
                                        ? "bg-white text-dark rounded p-2"
                                        : "text-white"
                                }`
                            }
                        >
                            <i className="bi bi-list-task me-2" /> My Task
                        </NavLink>
                    </li>


                    <li className="nav-item mb-2">
                        <NavLink
                            to="/dashboard/task-categories"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${
                                    isActive
                                        ? "bg-white text-dark rounded p-2"
                                        : "text-white"
                                }`
                            }
                        >
                            <i className="bi bi-layout-text-sidebar-reverse me-2" />{" "}
                            Task Categories
                        </NavLink>
                    </li>
=

                    <li className="nav-item mb-2">
                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${
                                    isActive
                                        ? "bg-white text-dark rounded p-2"
                                        : "text-white"
                                }`
                            }
                        >
                            <i className="bi bi-gear me-2" /> Settings
                        </NavLink>
                    </li>

                    <li className="nav-item mt-3">
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
                        >
                            <i className="bi bi-box-arrow-right me-2" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            {/* Modal Konfirmasi Logout */}
            <Modal
                show={showLogoutModal}
                onHide={() => setShowLogoutModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah Anda yakin ingin keluar dari aplikasi?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleLogoutConfirm}>
                        Keluar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
