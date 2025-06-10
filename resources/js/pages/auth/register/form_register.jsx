import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../_services/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error(error.response?.data);
      alert("Gagal registrasi: " + (error.response?.data?.message || "Terjadi kesalahan."));
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        padding: "1rem",
      }}
    >
      {/* Judul OrganizeMe */}
      <div className="mb-3 text-center">
        <h1
          className="fw-bold"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "1.8rem",
            color: "#ffffff",
            userSelect: "none",
          }}
        >
          <span style={{ color: "#ffffff" }}>Or</span>ganize
          <span style={{ color: "#4ECDC4" }}>Me</span>
        </h1>
      </div>

      {/* Kotak Form (putih) */}
      <div
        className="rounded-4 shadow p-4"
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "400px",
          color: "#0E2148",
        }}
      >
        <div className="text-center mb-3">
             <h2 style={{color: "#ff9800"}}>Register</h2>
          <p style={{ fontSize: "0.9rem" }}>
            Register to manage your habits efficiently
          </p>
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control form-control-sm"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ fontSize: "0.9rem" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ fontSize: "0.9rem" }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-sm"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ fontSize: "0.9rem" }}
            />
          </div>
            <br></br>
          <button
            type="submit"
            className="btn btn-sm w-100 text-white"
            style={{
              backgroundColor: "#ff9800",
              border: "none",
              fontSize: "0.9rem",
            }}
          >
            Daftar
          </button>

          <p className="mt-3 text-center text-muted" style={{ fontSize: "0.85rem" }}>
            Sudah punya akun? <Link to="/" className="text-decoration-underline">Login di sini</Link>
          </p>
        </form>
      </div>

      {/* Pop-up Sukses */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem 3rem",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h3>Registrasi Berhasil!</h3>
            <p>Silakan klik tombol di bawah untuk login.</p>
            <button className="btn btn-primary px-4 py-2" onClick={() => navigate("/")}>
              Login
            </button>
            <button className="btn btn-secondary px-4 py-2 ms-3" onClick={() => setShowSuccessPopup(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
