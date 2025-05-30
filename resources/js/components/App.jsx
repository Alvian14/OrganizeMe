import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/auth/login/form_login';
import Home from '../pages';
import Register from "../pages/auth/register/form_register";

import DashboardLayout from './layouts/DashboardLayout';
import TaskDashboard from "../pages/dasboard/TaskDashboard";
import MyTask from "../pages/mytask";
import TaskCategories from "../pages/taskcategories/TaskCategories";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard routes with layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<TaskDashboard />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/dashboard/task-categories" element={<TaskCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
