import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // Animate logo
    tl.fromTo('.loading-logo', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
      0
    );

    // Animate text
    tl.fromTo('.loading-text', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.3
    );

    // Animate progress bar container
    tl.fromTo('.progress-container', 
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      0.5
    );

    // Exit animation
    tl.to('.loading-screen', {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut'
    }, '+=0.5');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="loading-logo mb-8">
          <h1 className="text-5xl font-bold mb-2">TrueHorizon</h1>
          <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        </div>
        
        <p className="loading-text text-xl mb-8 opacity-80">
          Initializing AI Solutions...
        </p>
        
        <div className="progress-container w-64 h-1 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-sm opacity-60">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
