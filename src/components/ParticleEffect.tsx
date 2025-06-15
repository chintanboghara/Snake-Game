
import React, { useEffect, useState, useCallback, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ParticleEffectProps {
  x: number;
  y: number;
  type: 'eat' | 'wall' | 'powerup';
  cellSize: number;
  onComplete?: () => void;
}

const ParticleEffect = React.memo(({ x, y, type, cellSize, onComplete }: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const particleConfig = useMemo(() => {
    const configs = {
      eat: {
        count: 8,
        colors: ['#ef4444', '#f97316', '#eab308'],
        speed: { min: 1, max: 2 },
        size: { min: 2, max: 4 },
        life: 60
      },
      powerup: {
        count: 12,
        colors: ['#8b5cf6', '#06b6d4', '#10b981'],
        speed: { min: 1, max: 2 },
        size: { min: 3, max: 5 },
        life: 80
      },
      wall: {
        count: 15,
        colors: ['#6b7280', '#374151', '#1f2937'],
        speed: { min: 2, max: 5 },
        size: { min: 2, max: 4 },
        life: 100
      }
    };
    return configs[type];
  }, [type]);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleConfig.count; i++) {
      const angle = (Math.PI * 2 * i) / particleConfig.count + Math.random() * 0.5;
      const speed = particleConfig.speed.min + Math.random() * (particleConfig.speed.max - particleConfig.speed.min);
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: particleConfig.life,
        maxLife: particleConfig.life,
        color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
        size: particleConfig.size.min + Math.random() * (particleConfig.size.max - particleConfig.size.min)
      });
    }
    
    setParticles(newParticles);

    let animationId: number;
    let lastTime = 0;
    let hasCompleted = false;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 16) { // ~60fps
        setParticles(prev => {
          const updated = prev.map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: Math.max(0, particle.life - 1),
            vy: particle.vy + 0.1 // gravity effect
          })).filter(particle => particle.life > 0);

          if (updated.length === 0 && prev.length > 0 && !hasCompleted) {
            hasCompleted = true;
            setTimeout(handleComplete, 0);
            return [];
          }

          return updated;
        });
        lastTime = currentTime;
      }
      
      if (!hasCompleted) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particleConfig, handleComplete]);

  if (particles.length === 0) return null;

  return (
    <div 
      className="absolute pointer-events-none z-10"
      style={{
        left: x * cellSize,
        top: y * cellSize,
        width: cellSize,
        height: cellSize,
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${particle.x - particle.size/2}px, ${particle.y - particle.size/2}px)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: Math.max(0, particle.life / particle.maxLife),
          }}
        />
      ))}
    </div>
  );
});

ParticleEffect.displayName = 'ParticleEffect';

export default ParticleEffect;
