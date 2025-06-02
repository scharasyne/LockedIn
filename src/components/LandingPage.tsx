import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PopUpModal from '../components/PopUpModal';

// Standalone particles background implementation
function startParticles(canvas: HTMLCanvasElement) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const ctxSafe = ctx!;

  // Particle config
  const config = {
    particles: 80,
    color: '#fff', // white particles
    size: { min: 2, max: 5 },
    speed: 1.5,
    lineDistance: 150,
    opacity: 0.20,
  };

  // Particle class
  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      const angle = Math.random() * 2 * Math.PI;
      const speed = config.speed * (0.5 + Math.random());
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = config.size.min + Math.random() * (config.size.max - config.size.min);
    }
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
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

  // Create particles
  let particles: Particle[] = [];
  for (let i = 0; i < config.particles; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    ctxSafe.clearRect(0, 0, canvas.width, canvas.height);
    // Draw lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.lineDistance) {
          ctxSafe.globalAlpha = (1 - dist / config.lineDistance) * config.opacity;
          ctxSafe.beginPath();
          ctxSafe.moveTo(particles[i].x, particles[i].y);
          ctxSafe.lineTo(particles[j].x, particles[j].y);
          ctxSafe.strokeStyle = config.color;
          ctxSafe.lineWidth = 1;
          ctxSafe.stroke();
          ctxSafe.globalAlpha = 1;
        }
      }
    }
    // Move and draw particles
    for (let p of particles) {
      p.move();
      p.draw(ctxSafe);
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Responsive resize
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
}

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      startParticles(canvasRef.current);
    }
  }, []);

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="relative min-h-screen w-full">      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          pointerEvents: 'none',
          zIndex: 0,
          background: 'black'
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-white font-poppins bg-transparent relative z-10">
        {/* <div className="absolute top-4 right-6 flex space-x-6 text-white font-medium text-sm sm:text-base">
          <a
            href="/"
            className="bg-transparent border-none p-0 m-0 hover:underline text-white no-underline outline-none focus:outline-none focus-visible:outline-none"
          >
            Home
          </a>

          <a
            href="/about"
            className="bg-transparent border-none p-0 m-0 hover:underline text-white no-underline outline-none focus:outline-none focus-visible:outline-none"
          >
            About
          </a>

        </div> */}

        <div className="text-center mb-10">
          <h1 className="text-7xl sm:text-8xl text-white animate-fadeInUp">
            <span className="font-bold">Locked</span>
            <span className="font-normal">In</span>
          </h1>
          <p className="mt-4 text-lg font-inter italic text-gray-300 max-w-xl mx-auto">
            A minimalist, distraction-free timer designed to help you focus better. Choose a session, start your timer, and train your mind — one cycle at a time.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              setPopupTitle('OG Pomodoro');
              setIsPopupOpen(true);
            }}
            className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
          >
            OG POMODORO
          </button>
          <button
            onClick={() => {
              setPopupTitle('Short Study Session');
              setIsPopupOpen(true);
            }}
            className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
          >
            SHORT STUDY SESSION
          </button>
          <button
          onClick={() => {
            setPopupTitle('Long Study Session');
            setIsPopupOpen(true);
          }}
          className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
        >
          LONG STUDY SESSION
          </button>
          <button
          onClick={() => {
            setPopupTitle('Customize');
            setIsPopupOpen(true);
          }}
          className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
        >
          CUSTOM
        </button>
        <PopUpModal
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title={popupTitle}
          onStart={(options) => {
            console.log("Starting with:", options);
            // Implement your timer/session logic here!
          }}
        />

        </div>
      </div>
    </div>
    
  );
};

export default LandingPage;
