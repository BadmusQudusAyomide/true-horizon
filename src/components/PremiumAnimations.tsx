import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PremiumAnimations = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      gsap.set(follower, {
        x: followerX,
        y: followerY
      });
      
      requestAnimationFrame(animateFollower);
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .animate-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    animateFollower();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={followerRef}
        className="fixed w-8 h-8 border-2 border-blue-600 rounded-full pointer-events-none z-40"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default PremiumAnimations;
