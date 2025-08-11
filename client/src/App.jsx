import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />

        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;