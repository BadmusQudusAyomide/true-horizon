import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>We build intelligent AI Solutions designed for business growth.</h1>
            <p>Unlock untapped potential with safe, responsible, and powerful AI solutions.</p>
            <div className="cta-buttons">
              <a href="#get-started" className="btn btn-primary">Get Started</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/graph-illustration.svg" alt="AI Solutions Graph" />
          </div>
        </div>
      </header>

      {/* Solutions Section */}
      <section id="solutions" className="solutions">
        <div className="container">
          <h2>Our Solutions</h2>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="icon">🤖</div>
              <h3>AI Consulting</h3>
              <p>Expert guidance to implement AI strategies that drive business growth and innovation.</p>
            </div>
            <div className="solution-card">
              <div className="icon">📊</div>
              <h3>Data Analytics</h3>
              <p>Unlock insights from your data with our advanced analytics solutions.</p>
            </div>
            <div className="solution-card">
              <div className="icon">🔍</div>
              <h3>Predictive Modeling</h3>
              <p>Anticipate trends and make data-driven decisions with our predictive models.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <h2>About TrueHorizon</h2>
            <p>
              At TrueHorizon, we believe in the transformative power of artificial intelligence. 
              Our team of experts is dedicated to helping businesses leverage AI to solve complex 
              challenges and unlock new opportunities.
            </p>
            <p>
              With years of experience in machine learning, data science, and software engineering, 
              we deliver customized AI solutions that drive real business value.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">TrueHorizon</div>
            <div className="footer-links">
              <a href="#solutions">Solutions</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} TrueHorizon AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
