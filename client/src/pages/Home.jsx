import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-codelessweb-1.onrender.com';

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/store-email`, { address: email });
      toast.success(`${email} registered successfully!`);
      setEmail('');

      // ⏳ Delay redirect until toast is visible
      setTimeout(() => {
        window.location.href = 'https://calendly.com/ashishsharmakgp/intro-call?month=2025-08'; // ✅ Replace with your actual link
      }, 4000); // Match this with toast duration

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.error || 'Registration failed';

      if (status === 409) {
        toast.info('This email is already registered');
      } else if (status === 400) {
        toast.error('Please enter a valid email address');
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-between px-6">

      {/* Logo */}
      <header className='py-8 text-center'>
        <h1 className="text-base font-normal tracking-tight">
          CodelessWeb
          <span className="text-xl font-normal text-gray-400 md:text-base">.io</span>
        </h1>
      </header>

      <section className="max-w-3xl w-full space-y-8 text-center flex flex-col items-center justify-center py-12">


        {/* Launching Soon Button */}
        <button className="bg-gray-800 text-white rounded-full px-4 py-2 flex items-center hover:bg-gray-700 transition">
          <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c-1.1 0-2 .9-2 2v2.1c-2.9 1.1-5 3.9-5 7.2 0 .7.1 1.4.3 2.1l-2.3 2.3c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l2.3-2.3c.7.2 1.4.3 2.1.3 3.3 0 6.1-2.1 7.2-5H20c1.1 0 2-.9 2-2s-.9-2-2-2h-2.1c-1.1-2.9-3.9-5-7.2-5V4c0-1.1-.9-2-2-2zm0 14a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
          Launching soon this year
        </button>

        {/* Hero Text */}
        <h2 className="text-4xl md:text-4xl font-medium tracking-tight font-sans animate-fade-in-up delay-100">
          We design and launch optimized websites at warp speed.
        </h2>
        <p className="max-w-xl text-lg text-gray-300 md:text-xl animate-fade-in-up delay-200">
          At CodelessWeb, our small team is ready to build your end-to-end, fully optimized ✨ pixel-perfect website. We’ve delivered over +50 projects to clients globally. Schedule a quick call for pricing and a FREE DEMO.
        </p>

        {/* Email Input + CTA */}
        <div className="w-full max-w-sm space-y-4 animate-fade-in-up delay-300">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full px-6 py-2 flex items-center justify-center gap-2 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
              } text-white rounded-md transition`}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            {loading ? 'Submitting...' : 'Get Your FREE Demo'}
          </button>
        </div>

        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} />

      </section>
      <div className="py-8 text-center w-full max-w-sm space-y-4 animate-fade-in-up delay-300">
        <p className="text-sm text-gray-400">
          No commitment required. Let's explore how we can help grow your business.
        </p>
      </div>
    </main>
  );
};

export default Home;