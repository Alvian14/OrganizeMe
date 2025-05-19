import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/auth/login/form_login';
import Home from '../pages';
import Register from "../pages/auth/register/form_register";

export default function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path='home' element={<Home/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                </Routes>  
            </BrowserRouter>
        </div>
    );
}