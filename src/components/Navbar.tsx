import { useState } from 'react';
import '../App.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-left">
          <div className="logo">TrueHorizon</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#blog">Blog</a>
            <a href="#docs">Docs</a>
          </div>
        </div>
        <div className="nav-right">
          <a href="#get-started" className="btn btn-primary">Get Started</a>
        </div>
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div 
          className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        <div className={`nav-links mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#case-studies" onClick={() => setIsMenuOpen(false)}>Case Studies</a>
          <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
          <a href="#docs" onClick={() => setIsMenuOpen(false)}>Docs</a>
          <div className="mobile-menu-cta">
            <a href="#get-started" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Get Started</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
