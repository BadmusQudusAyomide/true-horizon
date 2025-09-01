import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo('.hero-title', 
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.2
        }
      );

      gsap.fromTo('.hero-subtitle', 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          delay: 0.5
        }
      );

      gsap.fromTo('.hero-button', 
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.8
        }
      );

      gsap.fromTo('.hero-image', 
        { 
          x: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.5, 
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Section animations with ScrollTrigger
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.fromTo(section, 
          { 
            y: 80, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Card animations
      gsap.utils.toArray('.animate-card').forEach((card: any, index: number) => {
        gsap.fromTo(card, 
          { 
            y: 60, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Stats counter animation
      gsap.utils.toArray('.animate-counter').forEach((counter: any) => {
        const endValue = counter.getAttribute('data-count');
        gsap.fromTo(counter, 
          { 
            textContent: 0 
          },
          {
            textContent: endValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Parallax effect for images
      gsap.utils.toArray('.parallax-element').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
