import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import PremiumAnimations from './components/PremiumAnimations';
import GlobalBackground from './components/GlobalBackground';
import FeaturesSection from './components/FeaturesSection';
import { useLenis } from './hooks/useLenis';
import { useGSAP } from './hooks/useGSAP';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();
  const containerRef = useGSAP();

  // Fallback: auto-dismiss loading screen in case animations fail in dev
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }
  return (
    <div ref={containerRef} className="min-h-screen">
      <GlobalBackground />
      <PremiumAnimations />
      <Navbar />
      
      <Hero />

      <FeaturesSection />

      {/* AI Integration Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="parallax-element w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-500">
                <div className="text-6xl animate-bounce">🤖</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Integrate With Tools You Know and Love</h2>
              <p className="text-xl text-gray-600 mb-6">TrueHorizon offers integration with 850+ industry standard tools.</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">View our tech stack here →</a>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">Python</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">JavaScript</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">React</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">Node.js</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">TensorFlow</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">AWS</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">Docker</span>
                <span className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-card">
              <div className="animate-counter text-5xl font-bold mb-2" data-count="5000000">5M+</div>
              <div className="text-xl">Viewers Educated</div>
            </div>
            <div className="animate-card">
              <div className="animate-counter text-5xl font-bold mb-2" data-count="200">200+</div>
              <div className="text-xl">AI Agents Deployed</div>
            </div>
            <div className="animate-card">
              <div className="text-5xl font-bold mb-2">14 days</div>
              <div className="text-xl">Average Time-to-POC</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-card text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform duration-300">1</div>
              <h3 className="text-2xl font-semibold mb-4">Discovery</h3>
              <p className="text-gray-600">We begin by understanding your vision, goals, and requirements. Through collaborative discussions and research, we lay the foundation for your project's success.</p>
            </div>
            
            <div className="animate-card text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform duration-300">2</div>
              <h3 className="text-2xl font-semibold mb-4">Development</h3>
              <p className="text-gray-600">Our team transforms ideas into reality through agile development. We build, test, and iterate, ensuring your solution meets the highest standards of quality and performance.</p>
            </div>
            
            <div className="animate-card text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform duration-300">3</div>
              <h3 className="text-2xl font-semibold mb-4">Deployment</h3>
              <p className="text-gray-600">We carefully launch your solution, ensuring a smooth transition to production. Our team provides ongoing support and optimization to keep your system running at its best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Businesses, Real Results</h2>
            <p className="text-xl text-gray-600">Experience the difference of an all-in-one workspace</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-card bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-600 mb-6">"Working with Nate and his team has been a truly positive experience. From the very beginning, the project was managed with a high level of professiona...See full testimonial"</p>
              <div>
                <div className="font-semibold">Erich Rohn</div>
                <div className="text-gray-500">Managing Director, Rohn Moden</div>
              </div>
            </div>
            
            <div className="animate-card bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-600 mb-6">"Nate's teams bring clarity to complexity, turning ideas into AI systems that actually provide value."</p>
              <div>
                <div className="font-semibold">Nick Sonnenberg</div>
                <div className="text-gray-500">Founder & CEO, Leverage, WSJ Bestselling Author</div>
              </div>
            </div>
            
            <div className="animate-card bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-600 mb-6">"Nate builds more than workflows, he builds trust."</p>
              <div>
                <div className="font-semibold">Jim Hankins</div>
                <div className="text-gray-500">CEO, Cloud Bedrock, LLC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our services and solutions.</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">What kinds of businesses do you work with?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How long does implementation usually take?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Who owns the AI that you build for customers?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How does your pricing work?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Do you offer courses or free training?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">What industries do you specialize in?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Do you build solutions from scratch or leverage tools?</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How do I know if AI is a good fit for my business?</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="animate-section py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-sm text-blue-600 font-medium mb-2">Industry News • 6 min read</div>
              <h3 className="text-xl font-semibold mb-4">6000 Jobs Cut at Microsoft: A Line in the Sand for AI-Driven Transformation</h3>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Read more →</a>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-sm text-blue-600 font-medium mb-2">AI & Software • 4 min read</div>
              <h3 className="text-xl font-semibold mb-4">Unveiling the o4 Mini: Revolutionizing AI with Compact Performance</h3>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Read more →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Unlock hidden potential within your business</h2>
          <p className="text-xl text-blue-100 mb-8">Unlock untapped potential with safe, responsible, and powerful AI solutions.</p>
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-4 px-8 rounded-lg transition-colors text-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">TrueHorizon</h3>
              <p className="text-gray-400 mb-6">Transforming businesses through intelligent AI solutions.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#resources" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#docs" className="text-gray-400 hover:text-white transition-colors">Docs</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ's</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About us</a></li>
                <li><a href="#get-started" className="text-gray-400 hover:text-white transition-colors">Get started</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Learn more about how we can make your business grow.</h4>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-4">
                Get Started
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <div className="text-gray-400">
              <p>©2025 True Horizon</p>
              <p className="text-sm">Website Development by Knit Studios</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
