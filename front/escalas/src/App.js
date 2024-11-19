import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ToolBar from './components/ToolBar';
import PrivateRoute from './config/PrivateRoute';

function App() {
  return (
    <Router>
      <ToolBar />
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute allowedRoles={['USER', 'ADMIN']} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
