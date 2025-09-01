import React, { useMemo } from 'react';

type Orb = {
  id: number;
  x: number; // %
  y: number; // %
  size: number; // px
  delay: number; // s
  duration: number; // s
  color: string; // hex
  opacity: number;
};

const makeOrbs = (count = 18): Orb[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 220 + 80,
    delay: Math.random() * 6,
    duration: Math.random() * 12 + 10,
    color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
    opacity: Math.random() * 0.25 + 0.08,
  }));

const GlobalBackground: React.FC = () => {
  const orbs = useMemo(() => makeOrbs(22), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 600px at 10% 10%, rgba(34,211,238,0.10), transparent 55%),\
             radial-gradient(900px 540px at 85% 15%, rgba(168,85,247,0.10), transparent 55%),\
             radial-gradient(800px 480px at 50% 90%, rgba(59,130,246,0.08), transparent 55%),\
             linear-gradient(180deg, #05060b 0%, #060a16 40%, #00040f 100%)',
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,255,0.07) 1px, transparent 1px),\
               linear-gradient(90deg, rgba(0,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(100% 70% at 50% 30%, black 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {orbs.map((o) => (
          <div
            key={o.id}
            className="absolute rounded-full"
            style={{
              width: o.size,
              height: o.size,
              left: `${o.x}%`,
              top: `${o.y}%`,
              background: `radial-gradient(circle at 30% 30%, ${o.color}55, ${o.color}22, transparent 70%)`,
              filter: 'blur(0.5px)',
              opacity: o.opacity,
              transform: 'translate(-50%, -50%)',
              animation: `global-float ${o.duration}s ease-in-out ${o.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Neural lines */}
      <svg className="absolute inset-0 w-full h-full opacity-25">
        <defs>
          <linearGradient id="gbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {Array.from({ length: 26 }).map((_, i) => (
          <line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#gbg)"
            strokeWidth="1"
            strokeDasharray="6 6"
            style={{ animation: `global-neural ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite` }}
          />
        ))}
      </svg>

      {/* Scanning lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
          style={{ animation: 'global-scan 9s linear infinite', top: '18%' }} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-30"
          style={{ animation: 'global-scan 11s linear infinite reverse', top: '62%' }} />
      </div>

      <style>{`
        @keyframes global-float {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          25% { transform: translate(-50%, -50%) translate(-16px, 10px) scale(1.05); }
          50% { transform: translate(-50%, -50%) translate(12px, -14px) scale(0.98); }
          75% { transform: translate(-50%, -50%) translate(-8px, 12px) scale(1.03); }
        }
        @keyframes global-neural {
          0% { stroke-dashoffset: 800; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes global-scan {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GlobalBackground;
