import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;
    const cta = ctaRef.current;
    const background = backgroundRef.current;

    if (!nav || !logo || !links || !cta || !background) return;

    // Initial navbar animation
    const tl = gsap.timeline();
    
    // Animate navbar entrance
    tl.fromTo(background, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(logo, 
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(links.children, 
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(cta, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Scroll-triggered navbar effects
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top -80',
      end: 'bottom bottom',
      onToggle: (self) => {
        if (self.isActive) {
          // Scrolled down - compact navbar
          gsap.to(nav, {
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 30px rgba(34, 211, 238, 0.10)',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(nav, {
            height: '70px',
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          // At top - expanded navbar
          gsap.to(nav, {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 6px 24px rgba(34, 211, 238, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(nav, {
            height: '80px',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });

    // Hover animations for links (guard against double-init in StrictMode)
    const navLinks = links.querySelectorAll('a');
    const mouseEnterHandlers: Array<[(e: Event) => void, HTMLAnchorElement]> = [];
    const mouseLeaveHandlers: Array<[(e: Event) => void, HTMLAnchorElement]> = [];

    navLinks.forEach(link => {
      const a = link as HTMLAnchorElement & { dataset: { enhanced?: string } };
      if (a.dataset.enhanced === 'true') return;

      a.style.position = 'relative';
      let underline = a.querySelector<HTMLDivElement>('.nav-underline');
      if (!underline) {
        underline = document.createElement('div');
        underline.className = 'nav-underline pointer-events-none absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 origin-left transition-transform duration-300';
        a.appendChild(underline);
      }

      const onEnter = () => {
        gsap.to(underline!, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(a, { y: -2, duration: 0.2, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(underline!, { scaleX: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(a, { y: 0, duration: 0.2, ease: 'power2.out' });
      };

      a.addEventListener('mouseenter', onEnter);
      a.addEventListener('mouseleave', onLeave);
      mouseEnterHandlers.push([onEnter, a]);
      mouseLeaveHandlers.push([onLeave, a]);

      a.dataset.enhanced = 'true';
    });

    // CTA button hover animation
    const ctaButton = cta.querySelector('a');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(34, 211, 238, 0.35)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          boxShadow: '0 4px 15px rgba(34, 211, 238, 0.22)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    // Logo hover animation
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.1,
        rotation: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    return () => {
      // Cleanup listeners and dynamic elements
      mouseEnterHandlers.forEach(([fn, el]) => el.removeEventListener('mouseenter', fn));
      mouseLeaveHandlers.forEach(([fn, el]) => el.removeEventListener('mouseleave', fn));
      navLinks.forEach(link => {
        const a = link as HTMLAnchorElement & { dataset: { enhanced?: string } };
        a.dataset.enhanced = undefined as any;
        const uls = a.querySelectorAll('.nav-underline');
        // keep only one underline; remove extras created by any prior runs
        if (uls.length > 1) {
          uls.forEach((el, idx) => { if (idx > 0) el.remove(); });
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="fixed w-full z-50"
    >
      <nav 
        ref={navRef}
        className="w-full bg-white/5 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
        style={{ height: '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span 
                ref={logoRef}
                className="text-2xl font-bold text-white cursor-pointer"
              >
                True<span className="text-cyan-400">Horizon</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div 
              ref={linksRef}
              className="hidden md:ml-10 md:flex md:items-center gap-x-8"
            >
              <a href="#home" className="relative inline-flex items-center text-cyan-100/80 hover:text-white px-3 py-2 text-base font-medium transition-colors">Home</a>
              <a href="#pricing" className="relative inline-flex items-center text-cyan-100/80 hover:text-white px-3 py-2 text-base font-medium transition-colors">Pricing</a>
              <a href="#about" className="relative inline-flex items-center text-cyan-100/80 hover:text-white px-3 py-2 text-base font-medium transition-colors">About</a>
              <a href="#case-studies" className="relative inline-flex items-center text-cyan-100/80 hover:text-white px-3 py-2 text-base font-medium transition-colors">Case Studies</a>
              <a href="#blog" className="relative inline-flex items-center text-cyan-100/80 hover:text-white px-3 py-2 text-base font-medium transition-colors">Blog</a>
            </div>

            {/* Desktop CTA */}
            <div 
              ref={ctaRef}
              className="hidden md:ml-10 md:flex md:items-center"
            >
              <a 
                href="#get-started" 
                className="relative overflow-hidden rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-6 py-2.5 text-sm font-semibold text-cyan-100 whitespace-nowrap transition-all duration-300 shadow-[0_0_24px_rgba(56,189,248,0.15)]"
              >
                <span className="relative z-10">Get Started</span>
                <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500/35 via-fuchsia-500/25 to-cyan-500/35 opacity-60 blur" aria-hidden="true"></span>
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
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</a>
              <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Pricing</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About</a>
              <a href="#case-studies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Case Studies</a>
              <a href="#blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Blog</a>
              <a href="#get-started" className="block px-3 py-2 mt-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
