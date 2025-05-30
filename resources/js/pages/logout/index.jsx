import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ show, onHide }) {
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token"); // hapus token
    onHide(); // tutup modal
    navigate("/"); // redirect ke login
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Apakah Anda yakin ingin keluar dari aplikasi?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleLogoutConfirm}>
          Keluar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
