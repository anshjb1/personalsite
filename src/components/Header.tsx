import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navItems = [
    { path: '/experience', label: 'Experience' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/features', label: 'Features' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`text-xl font-bold transition-all duration-300 hover:scale-105 ${
              isScrolled || !isHomePage
                ? 'text-gray-900 drop-shadow-sm'
                : 'text-white drop-shadow-lg'
            }`}
          >
            Ansh Bhatt
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 hover:scale-105 hover:opacity-75 relative ${
                  isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                } ${
                  location.pathname === item.path
                    ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-current after:rounded-full'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className={`md:hidden transition-all duration-300 hover:scale-110 ${
              isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-200/50">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left font-medium transition-all duration-300 hover:translate-x-2 hover:opacity-75 py-2 px-3 rounded-lg ${
                  isScrolled || !isHomePage ? 'text-gray-700' : 'text-gray-900'
                } ${
                  location.pathname === item.path
                    ? 'bg-miami-green-100 text-miami-green-700 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
