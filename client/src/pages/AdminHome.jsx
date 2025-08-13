import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const EmailDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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

  // Filter emails based on search input
  const filteredEmails = emails.filter((email) =>
    email.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <header className="w-full bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-black tracking-wide">
            CodelessWeb
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Email Dashboard */}
      <main className="flex-grow max-w-4xl mx-auto mt-10 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-200 mb-20">
        
        {/* Heading + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-3xl font-extrabold text-black flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
            <span role="img" aria-label="email"></span> Submitted Emails
          </h2>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[40vh] text-gray-500 animate-pulse">
            <p className="text-lg">Loading submitted emails...</p>
          </div>
        ) : filteredEmails.length === 0 ? (
          <p className="text-gray-500 text-center">No matching emails found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredEmails.map(({ address, timestamp, _id }) => (
              <li
                key={_id}
                className="flex justify-between items-center bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 p-4 rounded-lg border border-gray-300 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold text-lg">{address}</span>
                  <span className="text-sm text-gray-500">
                    {dayjs(timestamp).format('DD MMM YYYY, hh:mm A')}
                  </span>
                </div>
                <div className="text-xs text-gray-400 italic">
                  ID: {_id.slice(-6)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-300 py-6 mt-auto text-center text-sm text-gray-700 shadow-inner">
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
