import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/auth/login/form_login';
import Home from '../pages';
import Register from "../pages/auth/register/form_register";

import DashboardLayout from './layouts/DashboardLayout';
import TaskDashboard from "../pages/dasboard/TaskDashboard";
import MyTask from "../pages/mytask";
import AccountInfoPage from '../pages/settings';
import TopNavbar from './layouts/admin/Navbar';
import UsersPageAdmin from '../pages/admin/UsersPageAdmin';
import DashboardAdmin from './layouts/DashboardAdmin';
import TaskAdmin from '../pages/admin/TaskAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<AccountInfoPage/>} />

        {/* Protected Dashboard routes with layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<TaskDashboard />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/dashboard/settings" element={<AccountInfoPage/>} />
        </Route>

        <Route element={<DashboardAdmin/>}>
        <Route path="/admin/user-page-admin" element={<UsersPageAdmin/>} />
        <Route path="/admin/task-admin" element={<TaskAdmin/>} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}
