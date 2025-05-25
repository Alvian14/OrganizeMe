import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="login-container w-100 min-vh-100 bg-white d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    {/* Left side content */}
                    <div className="col-md-6 p-5">
                        <div className="login-content">
                            <h1 className="display-4 fw-bold mb-3">OrganizeMe</h1>
                            <p className="lead mb-5">Pick some new habits to get started</p>
                            
                            <div className="login-form mt-4">
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg border rounded" 
                                        id="username" 
                                    />
                                </div>
                                
                                <div className="mb-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg border rounded" 
                                        id="password" 
                                    />
                                </div>
                                
                                <div className="d-flex mt-4">
                                    <button type="submit" className="btn btn-secondary px-4 py-2 me-3">Sign In</button>
                                    <Link to="/register" className="btn btn-light px-4 py-2">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side with stars decoration */}
                    <div className="col-md-6 position-relative">
                        <div className="stars-decoration w-100 h-100">
                            {/* Star 1 - Top middle */}
                            <div className="star star-1 position-absolute" style={{
                                top: '15%',
                                right: '40%',
                                width: '80px',
                                height: '80px',
                                opacity: '1.0'
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#E6E6E6" />
                                </svg>
                            </div>
                            
                            {/* Star 2 - Middle right */}
                            <div className="star star-2 position-absolute" style={{
                                top: '45%',
                                right: '20%',
                                width: '100px',
                                height: '100px',
                                opacity: '0.7'
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#CCCCCC" />
                                </svg>
                            </div>
                            
                            {/* Star 3 - Bottom left */}
                            <div className="star star-3 position-absolute" style={{
                                bottom: '20%',
                                right: '50%',
                                width: '120px',
                                height: '120px',
                                opacity: '0.9'
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#E6E6E6" />
                                </svg>
                            </div>
                            
                            {/* Star 4 - Bottom right */}
                            <div className="star star-4 position-absolute" style={{
                                bottom: '10%',
                                right: '15%',
                                width: '90px',
                                height: '90px',
                                opacity: '1.0'
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#E6E6E6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}