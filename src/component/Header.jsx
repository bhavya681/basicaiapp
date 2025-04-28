import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-9 h-9 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Neurofusion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link 
              to="/imagegen" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 hover:after:w-full after:transition-all"
            >
              ImageGen
            </Link>
            <Link 
              to="/chat-res" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 hover:after:w-full after:transition-all"
            >
              ChatAI
            </Link>
            <Link 
              to="/translate" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 hover:after:w-full after:transition-all"
            >
              Translator
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
          <nav className="pb-2 space-y-1">
            <Link 
              to="/" 
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
            >
              Home
            </Link>
            <Link 
              to="/imagegen" 
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
            >
              ImageGen
            </Link>
            <Link 
              to="/chat-res" 
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
            >
              ChatAI
            </Link>
            <Link 
              to="/translate" 
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
            >
              Translator
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;