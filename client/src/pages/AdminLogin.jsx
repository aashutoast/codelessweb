import React from 'react';
import LoginComponent from '../components/Form';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gray-100 px-4">
      

      {/* Top Center Text */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-bold text-black">CodelessWeb</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md mt-20 mb-60">
        <LoginComponent />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-gray-300 py-4 flex flex-col items-center justify-center space-y-2 text-sm text-gray-700">
        <p>Contact technical team or admin for support.</p>
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-800 transition"
        >
          <ChevronUpIcon className="h-5 w-5" />
          <span>Top</span>
        </button>
      </footer>
    </div>
  );
};

export default Login;