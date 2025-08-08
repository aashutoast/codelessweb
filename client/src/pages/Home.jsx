import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

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

      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>High-Converting Startup Websites | CodelessWeb.io</title>
        <meta
          name="description"
          content="Affordable, SEO-optimized startup websites built with Webflow, Framer & Figma. Fast-loading, accessible, and designed to convert visitors into customers."
        />
        <meta
          name="keywords"
          content="startup website design, Webflow developer, Framer expert, Figma to Webflow, affordable web design, SEO optimized websites"
        />
        <meta property="og:title" content="CodelessWeb.io - High-Converting Startup Websites" />
        <meta property="og:description" content="We build pixel-perfect, SEO-optimized websites for startups — fast, affordable, and conversion-focused." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codelessweb.io" />
        {/* <meta property="og:image" content="https://codelessweb.io/og-image.jpg" /> */}
      </Helmet>

      {/* Logo */}
      <header className='py-8 text-center'>
        <h1 className="text-base font-normal tracking-tight">
          CodelessWeb
          <span className="text-xl font-normal text-gray-400 md:text-base">.io</span>
        </h1>
      </header>

      <section className="max-w-3xl w-full space-y-8 text-center flex flex-col items-center justify-center py-12">


        {/* Launching Soon Button */}
        <div className="bg-gray-800 text-white rounded-full px-4 py-2 flex items-center hover:bg-gray-700 transition">
          🚀 Built for Founders, Not Agencies
        </div>

        {/* Hero Text */}
        <h2 className="text-4xl md:text-4xl font-medium tracking-tight font-sans animate-fade-in-up delay-100">
          High-Impact Webflow & Framer Websites for Growing Startups
        </h2>
        <p className="max-w-xl text-lg text-gray-300 md:text-xl animate-fade-in-up delay-200">
          We help founders launch SEO-optimized, fast-loading, and accessible websites — from Figma to Webflow or Framer — without wasting time or budget.
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
            {loading ? 'Submitting...' : 'Book a Free Strategy Call'}
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