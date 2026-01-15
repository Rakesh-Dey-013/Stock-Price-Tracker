import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/stocks.png';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-medium' : 'text-gray-400 hover:text-white';
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="CryptoStocks" className="h-8 mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                CryptoStocks
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sl ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                to="/markets"
                className={`px-3 py-2 rounded-md text-sl ${isActive('/markets')}`}
              >
                Markets
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sl ${isActive('/about')}`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;