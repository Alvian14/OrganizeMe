import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <div
      className="bg-secondary text-white border-end p-3 d-flex flex-column"
      style={{
        width: "250px",
        minHeight: "100vh",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      <div className="text-center mb-4">
        <h4 className="fw-bold text-white">OrganizME</h4>
      </div>

      {/* === Menu Section: Tasks & Users === */}
      <div className="mb-4">
        <h6 className="text-light">Menu</h6>
        <ul className="nav flex-column">

        <li className="nav-item">
            <NavLink
              to="/admin/user-page-admin"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive
                    ? "bg-light text-dark rounded p-2"
                    : "text-white"
                }`
              }
            >
              👥 Users
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/task-admin"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive
                    ? "bg-light text-dark rounded p-2"
                    : "text-white"
                }`
              }
            >
              ✅Tasks
            </NavLink>
          </li>
         
        </ul>
      </div>

      {/* === Settings === */}
      <div className="mb-4">
        <h6 className="text-light">Account</h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive
                    ? "bg-light text-dark rounded p-2"
                    : "text-white"
                }`
              }
            >
              ⚙️ Account Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* === Logout Button === */}
      <div className="mt-auto">
        <NavLink
          to="/"
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-box-arrow-right me-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
}
