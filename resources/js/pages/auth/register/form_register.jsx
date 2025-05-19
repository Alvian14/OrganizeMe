import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="register-container w-100 min-vh-100 bg-white d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    {/* Left side content */}
                    <div className="col-md-6 p-5">
                        <div className="register-content">
                            <h1 className="display-4 fw-bold mb-3">OrganizeMe</h1>
                            <p className="lead mb-5">Pick some new habits to get started</p>
                            
                            <div className="register-form mt-4">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg border rounded" 
                                        id="username" 
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg border rounded" 
                                        id="password" 
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg border rounded" 
                                        id="email" 
                                    />
                                </div>
                                
                                <div className="mt-4 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-outline-dark px-5 py-2">GO</button>
                                </div>
                                
                                <div className="mt-3">
                                    <p>
                                        Already have an account? <Link to="/login">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side with stars decoration */}
                    <div className="col-md-6 position-relative">
                        <div className="stars-decoration w-100 h-100">
                            {/* Star 1 - Top right */}
                            <div className="star star-1 position-absolute" style={{
                                top: '10%',
                                right: '15%',
                                width: '80px',
                                height: '80px',
                                opacity: '0.6'
                            }}>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#E6E6E6" />
                                </svg>
                            </div>
                            
                            {/* Star 2 - Middle right (darker) */}
                            <div className="star star-2 position-absolute" style={{
                                top: '45%',
                                right: '30%',
                                width: '100px',
                                height: '100px',
                                opacity: '0.8'
                            }}>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#A0A0A0" />
                                </svg>
                            </div>
                            
                            {/* Star 3 - Bottom middle */}
                            <div className="star star-3 position-absolute" style={{
                                bottom: '20%',
                                right: '50%',
                                width: '120px',
                                height: '120px',
                                opacity: '0.5'
                            }}>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#E6E6E6" />
                                </svg>
                            </div>
                            
                            {/* Star 4 - Bottom right */}
                            <div className="star star-4 position-absolute" style={{
                                bottom: '10%',
                                right: '15%',
                                width: '90px',
                                height: '90px',
                                opacity: '0.6'
                            }}>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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