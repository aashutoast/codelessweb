import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ List of valid credentials
  const validUsers = [
    { email: 'admin@example.com', password: 'secure123' },
    { email: 'mayankfhacker@gmail.com', password: 'Sharma@2005' },
    { email: 'ashishbiz@pm.me', password: 'f0und3r' },
  ];

  const handleLogin = () => {
    // ✅ Check if credentials match any user
    const isValid = validUsers.find(
      (user) => user.email === email && user.password === password
    );

    isValid ? navigate('/admin-home') : alert('Invalid credentials');
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 rounded-lg shadow-md bg-[#f5f5f5] border border-gray-300">
      <h2 className="text-xl font-semibold mb-6 text-black">Authorized User Login</h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 placeholder-gray-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 placeholder-gray-500 focus:outline-none"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-2 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition"
      >
        Access Dashboard
      </button>
    </div>
  );
};

export default LoginComponent;