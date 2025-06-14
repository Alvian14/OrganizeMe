import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, useDecodeToken } from "../../../_services/auth";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const token = localStorage.getItem("accessToken");
    const decodedData = useDecodeToken(token);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);

            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("userInfo", JSON.stringify(response.user));

            return navigate(response.user.role === "admin" ? "/admin/user-page-admin" : "/dashboard");
        } catch (error) {
            alert(error?.response?.data?.message || "Login gagal");
        }
    };

    useEffect(() => {
        if (token && decodedData && decodedData.success) {
            navigate("/admin/user-page-admin");
        }
    }, [token, decodedData, navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
            {/* Judul di atas form */}
            <div className="mb-3 text-center">
                <h1
                    className="fw-bold"
                    style={{
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        fontSize: "1.8rem",
                        color: "#0E2148",
                        userSelect: "none",
                    }}
                >
                    <span style={{ color: "#0E2148" }}>Or</span>ganize
                    <span style={{ color: "#4ECDC4" }}>Me</span>
                </h1>
            </div>

            {/* Kotak form login */}
            <div
                className="rounded-4 shadow p-4 text-white"
                style={{
                    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <div className="text-center mb-3">
                    <h2 style={{ color: "#ff9800" }}>Log In</h2>
                    <p style={{ fontSize: "0.9rem" }}>
                        Log in to manage your habits efficiently
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="username"
                            value={formData.username}
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
                            className="form-control form-control-sm"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ fontSize: "0.9rem" }}
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-sm flex-grow-1 text-white"
                            style={{
                                fontSize: "0.9rem",
                                backgroundColor: "#ff9800",
                                border: "none",
                            }}
                        >
                            Login
                        </button>
                        <Link
                            to="/register"
                            className="btn btn-outline-light btn-sm flex-grow-1"
                            style={{ fontSize: "0.9rem" }}
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
