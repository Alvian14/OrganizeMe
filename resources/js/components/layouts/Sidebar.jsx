import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Sidebar() {
    return (
        <div
            className="text-white p-3"
            style={{
                width: "250px",
                backgroundColor: "#0E2148",  // <-- ini warna backgroundnya
                overflowY: "hidden" // supaya gak bisa di scroll
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
                        <i className="bi bi-layout-text-sidebar-reverse me-2" /> Task Categories
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink
                        to="/settings"
                        className="nav-link d-flex align-items-center text-white"
                    >
                        <i className="bi bi-gear me-2" /> Settings
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/logout"
                        className="nav-link d-flex align-items-center text-white"
                    >
                        <i className="bi bi-box-arrow-right me-2" /> Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
