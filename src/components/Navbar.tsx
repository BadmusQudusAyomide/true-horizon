import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900">TrueHorizon</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Home</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Pricing</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">About</a>
            <a href="#case-studies" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Case Studies</a>
            <a href="#blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Blog</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:ml-10 md:flex md:items-center">
            <a 
              href="#get-started" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors whitespace-nowrap"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</a>
          <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Pricing</a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About</a>
          <a href="#case-studies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Case Studies</a>
          <a href="#blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Blog</a>
          <a href="#docs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Docs</a>
          <a href="#get-started" className="block px-3 py-2 mt-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
