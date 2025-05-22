import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/auth/login/form_login';
import Home from '../pages';
import Register from "../pages/auth/register/form_register";
import TaskDashboard from "../pages/dasboard";

export default function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Login/>} />
                    <Route path='/home' element={<Home/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/dashboard" element={<TaskDashboard />} />
                </Routes>  
            </BrowserRouter>
        </div>
    );
}