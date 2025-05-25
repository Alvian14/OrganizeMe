import React from 'react';

export default function Topbar() {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm rounded">
      <input type="text" className="form-control w-50" placeholder="Search your task here..." />
      <div>
        <i className="bi bi-bell me-3 fs-5" />
        <i className="bi bi-calendar fs-5" />
        <span className="ms-3 text-primary">Tuesday <br /><small>20/06/2023</small></span>
      </div>
    </div>
  );
}
