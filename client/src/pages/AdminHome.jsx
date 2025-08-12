import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const EmailDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://backend-codelessweb-1.onrender.com/api/emails')
      .then((res) => {
        setEmails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching emails:', err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navigation */}
      <header className="w-full bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">CodelessWeb</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Email Dashboard */}
      <main className="flex-grow max-w-4xl mx-auto mt-12 px-6 py-8 bg-white shadow-xl rounded-xl border border-gray-200 mb-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
          <span role="img" aria-label="email">📨</span> Submitted Emails
        </h2>

        {loading ? (
          <div className="flex items-center justify-center h-[40vh] text-gray-500 animate-pulse">
            <p className="text-lg">Loading submitted emails...</p>
          </div>
        ) : emails.length === 0 ? (
          <p className="text-gray-500 text-center">No emails found.</p>
        ) : (
          <ul className="space-y-4">
            {emails.map(({ address, timestamp, _id }) => (
              <li
                key={_id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-4 rounded-lg border border-gray-300 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium text-lg">{address}</span>
                  <span className="text-sm text-gray-500">
                    {dayjs(timestamp).format('DD MMM YYYY, hh:mm A')}
                  </span>
                </div>
                <div className="text-xs text-gray-400 italic">ID: {_id.slice(-6)}</div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-300 py-6 mt-auto text-center text-sm text-gray-700">
        <p className="mb-3">Contact technical team or admin for support.</p>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center space-x-1 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          <ChevronUpIcon className="h-5 w-5" />
          <span>Back to Top</span>
        </button>
      </footer>
    </div>
  );
};

export default EmailDashboard;