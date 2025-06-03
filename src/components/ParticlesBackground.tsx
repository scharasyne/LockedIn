import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  key?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    //ensures TypeScript knows these are not null in this scope
    const safeCanvas: HTMLCanvasElement = canvas;
    const safeCtx: CanvasRenderingContext2D = ctx;

    const config = {
      particles: 80,
      color: '#fff',
      size: { min: 2, max: 5 },
      speed: 1.5,
      lineDistance: 150,
      opacity: 0.20,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
        constructor() {
        // particles in a small cluster in the top-left corner
        const clusterRadius = 50; // size sa cluster
        const centerX = clusterRadius;
        const centerY = clusterRadius;
        //random pos sa cluster
        const r = Math.random() * clusterRadius;
        const angle = Math.random() * 2 * Math.PI;
        this.x = centerX + r * Math.cos(angle);
        this.y = centerY + r * Math.sin(angle);
        
        // initial velocity (pointing outward from the cluster)
        const moveAngle = Math.atan2(this.y - centerY, this.x - centerX);
        const speed = config.speed * (0.5 + Math.random());
        this.vx = Math.cos(moveAngle) * speed;
        this.vy = Math.sin(moveAngle) * speed;
        this.size = config.size.min + Math.random() * (config.size.max - config.size.min);
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > safeCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > safeCanvas.height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = config.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = config.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // kausa ra ang particles ma-form
    let particles: Particle[] = [];
    for (let i = 0; i < config.particles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.lineDistance) {
            safeCtx.globalAlpha = (1 - dist / config.lineDistance) * config.opacity;
            safeCtx.beginPath();
            safeCtx.moveTo(particles[i].x, particles[i].y);
            safeCtx.lineTo(particles[j].x, particles[j].y);
            safeCtx.strokeStyle = config.color;
            safeCtx.lineWidth = 1;
            safeCtx.stroke();
            safeCtx.globalAlpha = 1;
          }
        }
      }
      
      for (let p of particles) {
        p.move();
        p.draw(safeCtx);
      }
      requestAnimationFrame(animate);
    }

    function resize() {
      safeCanvas.width = window.innerWidth;
      safeCanvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'black'
      }}
    />
  );
};

export default ParticlesBackground;
