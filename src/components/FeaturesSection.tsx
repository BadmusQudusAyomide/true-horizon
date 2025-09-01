import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: 'ai-agents',
    icon: '🤖',
    title: 'Custom AI Agent Engineering',
    description: 'We design, deploy, and maintain custom AI agents specifically tailored to your business growth goals.',
    gradient: 'from-cyan-500/20 to-blue-600/20'
  },
  {
    id: 'automation',
    icon: '⚡',
    title: 'Fully Managed Automation Pipelines',
    description: 'Robust data infrastructure and ingestion processes are a critical component in how we build out our systems.',
    gradient: 'from-purple-500/20 to-pink-600/20'
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'Performance Analytics Dashboard',
    description: 'Easily track ROI and efficiency gains with custom metrics on your AI agent\'s performance.',
    gradient: 'from-emerald-500/20 to-teal-600/20'
  },
  {
    id: 'access-control',
    icon: '🔐',
    title: 'Intelligent Access Control',
    description: 'Manage agent permissions with your teams to ensure secure operations across your organization.',
    gradient: 'from-orange-500/20 to-red-600/20'
  },
  {
    id: 'compliance',
    icon: '🛡️',
    title: 'Secure & Compliant Protocols',
    description: 'Technology architecture that is fully hosted in the cloud, ensuring compliance with SOC-2, ISO, and other industry standards.',
    gradient: 'from-indigo-500/20 to-purple-600/20'
  },
  {
    id: 'integration',
    icon: '🔗',
    title: 'Seamless Tool Integration',
    description: 'Connect with 850+ industry-standard tools and platforms to streamline your existing workflows.',
    gradient: 'from-rose-500/20 to-pink-600/20'
  }
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !subtitle || !cards) return;

    // Title and subtitle animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    headerTl
      .fromTo(title, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(subtitle,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

    // Cards scroll animation with Lenis-style smooth reveal
    const cardElements = cards.querySelectorAll('.feature-card');
    
    cardElements.forEach((card, index) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
          },
          onLeave: () => {
            gsap.to(card, {
              scale: 0.95,
              rotationY: -5,
              z: -50,
              duration: 0.6,
              ease: 'power2.inOut'
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              scale: 0.98,
              rotationY: 3,
              z: -30,
              duration: 0.6,
              ease: 'power2.inOut'
            });
          }
        }
      });

      // Initial state
      gsap.set(card, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotationY: 10,
        transformPerspective: 1000
      });

      // Entrance animation
      cardTl.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Parallax effect for cards during scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        cardElements.forEach((card, index) => {
          const offset = (index % 2 === 0 ? 1 : -1) * progress * 20;
          gsap.set(card, {
            y: offset,
            rotationX: progress * 2 * (index % 2 === 0 ? 1 : -1)
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-transparent overflow-hidden">
      {/* Section background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Everything You Need
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              In One Place
            </span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed"
          >
            Powerful AI solutions designed to transform your business operations and accelerate growth.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:bg-white/8 hover:scale-[1.02] hover:-translate-y-2">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Glow effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-cyan-100/70 leading-relaxed group-hover:text-cyan-100/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
