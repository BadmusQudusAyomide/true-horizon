import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  type Orb = {
    id: number;
    x: number; // percentage
    y: number; // percentage
    size: number; // px
    delay: number; // s
    duration: number; // s
    color: string; // hsl base
    opacity: number;
  };

  const createOrbs = (): Orb[] => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 50,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      color: `hsl(${180 + Math.random() * 120}, 70%, 60%)`,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  };

  const [orbs] = useState<Orb[]>(createOrbs);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create particle system (neon cyan/magenta additive look)
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;

      // Palette between cyan and magenta with slight variation
      const t = Math.random();
      const r = 0.6 + 0.4 * t;       // 0.6..1.0
      const g = 0.2 + 0.6 * (1 - t); // 0.2..0.8
      const b = 0.8 + 0.2 * t;       // 0.8..1.0
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;

      sizes[i] = Math.random() * 2.5 + 1.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Wave + drift to create fly-through feel
          pos.y += sin(pos.x * 0.6 + time * 1.5) * 0.6;
          pos.x += cos(pos.z * 0.6 + time) * 0.35;
          pos.z += sin(pos.y * 0.4 + time * 0.7) * 0.25;
          
          // Mouse interaction
          float mouseDistance = distance(pos.xy, mouse * 10.0);
          pos.z += sin(mouseDistance * 0.12 - time * 2.0) * 2.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          
          // Soft neon glow falloff
          float alpha = smoothstep(0.5, 0.0, r);
          alpha = pow(alpha, 1.6);
          gl_FragColor = vec4(vColor, alpha * 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    camera.position.z = 6;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (material.uniforms) {
        material.uniforms.time.value += 0.01;
        material.uniforms.mouse.value.set(mousePosition.x, mousePosition.y);
      }
      
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [mousePosition]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 100
      });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Title animation with morphing effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        onComplete: () => {
          // Start morphing animation
          gsap.to(titleRef.current, {
            scale: 1.05,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Floating animation for the entire hero
      gsap.to(heroRef.current, {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Text reveal animation
      const splitText = (element: HTMLElement) => {
        const text = element.textContent || '';
        element.innerHTML = text
          .split('')
          .map((char) => `<span style="display: inline-block; opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
        
        gsap.to(element.children, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: "back.out(1.7)",
          delay: 1
        });
      };

      if (titleRef.current) {
        setTimeout(() => splitText(titleRef.current!), 500);
      }

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(heroRef.current, {
            scale: 1 - progress * 0.1,
            opacity: 1 - progress * 0.3,
            duration: 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#05060b] via-[#060a16] to-[#00040f] pt-28 md:pt-32">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Layered Radial Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 2,
          background: `
            radial-gradient(80rem 40rem at 20% 20%, rgba(34,211,238,0.12), transparent 50%),
            radial-gradient(70rem 35rem at 80% 30%, rgba(168,85,247,0.10), transparent 55%),
            radial-gradient(60rem 30rem at 50% 85%, rgba(59,130,246,0.10), transparent 50%)
          `
        }}
      />
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ zIndex: 2 }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'matrix-rain 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Orbs Background */}
      <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: 'none' }}>
        {orbs.map((orb, index) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle at 30% 30%, ${orb.color}40, ${orb.color}10, transparent)`,
              filter: 'blur(1px)',
              opacity: orb.opacity,
              animation: `float-${index} ${orb.duration}s ease-in-out infinite ${orb.delay}s`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Additional Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}60 0%, ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}20 30%, transparent 70%)`,
              filter: 'blur(2px)',
              animation: `glow-pulse ${3 + Math.random() * 2}s ease-in-out infinite ${i * 0.5}s`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Neural Network SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 2 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            style={{
              animation: `neural-network ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Title (crisp, no blur) */}
          <div className="relative mb-8">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-4"
              style={{
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility',
              }}
            >
              We build intelligent
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">AI Solutions</span>
            </h1>
            {/* Subtle frame */}
            <div className="absolute -inset-4 rounded-lg pointer-events-none ring-1 ring-white/10" />
          </div>

          {/* Animated Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-base md:text-xl text-cyan-100/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{}}
          >
            Unlock untapped potential with safe, responsible, and powerful AI solutions designed for exponential business growth.
          </p>

          {/* Futuristic CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              ref={buttonRef}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white backdrop-blur-md bg-white/10 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/15 hover:translate-y-[-2px] hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]"
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 tracking-wide">Get Started</span>
              <svg className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-cyan-400/30 via-fuchsia-400/20 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border border-cyan-400/60 text-cyan-300 bg-transparent transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:translate-y-[-2px]">
              <span className="relative z-10 tracking-wide">Learn More</span>
              <svg className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-cyan-400 opacity-60" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-purple-400 opacity-60" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-purple-400 opacity-60" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-cyan-400 opacity-60" />

      {/* Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div 
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
          style={{
            animation: 'matrix-rain 8s linear infinite',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
          style={{
            animation: 'matrix-rain 10s linear infinite reverse',
            top: '60%'
          }}
        />
      </div>
      
      <style>{`
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes cyber-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px #00ffff40, inset 0 0 20px #00ffff20;
            border-color: #00ffff60;
          }
          50% { 
            box-shadow: 0 0 40px #ff00ff60, inset 0 0 30px #ff00ff30;
            border-color: #ff00ff80;
          }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px #00ffff80, 0 0 20px #00ffff60, 0 0 30px #00ffff40; }
          50% { text-shadow: 0 0 20px #ff00ff80, 0 0 40px #ff00ff60, 0 0 60px #ff00ff40; }
        }

        @keyframes hologram-flicker {
          0%, 100% { opacity: 1; transform: scale(1) skew(0deg); }
          25% { opacity: 0.8; transform: scale(1.02) skew(0.5deg); }
          50% { opacity: 0.9; transform: scale(0.98) skew(-0.5deg); }
          75% { opacity: 0.95; transform: scale(1.01) skew(0.2deg); }
        }

        @keyframes glow-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }

        @keyframes neural-network {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        ${orbs.map((orb, index) => `
          @keyframes float-${index} {
            0%, 100% { 
              transform: translate(-50%, -50%) translateX(0) translateY(0) rotate(0deg) scale(1);
            }
            25% { 
              transform: translate(-50%, -50%) translateX(${Math.random() * 40 - 20}px) translateY(${Math.random() * 40 - 20}px) rotate(90deg) scale(1.1);
            }
            50% { 
              transform: translate(-50%, -50%) translateX(${Math.random() * 60 - 30}px) translateY(${Math.random() * 60 - 30}px) rotate(180deg) scale(0.9);
            }
            75% { 
              transform: translate(-50%, -50%) translateX(${Math.random() * 40 - 20}px) translateY(${Math.random() * 40 - 20}px) rotate(270deg) scale(1.05);
            }
          }
        `).join('\n')}
      `}</style>
    </section>
  );
};

export default Hero;
