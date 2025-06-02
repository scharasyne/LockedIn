import React, { useEffect, useRef } from 'react';

const SpiralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Black background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      ctx.save();

      const minDim = Math.min(width, height);
      const aspectRatio = width / height;
      const spiralScale = aspectRatio < 1 ? 0.48 : 0.62;
      ctx.translate(width / 2, height / 2);
      ctx.scale(spiralScale, spiralScale);      // white lines with reduced opacity
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 1;

      const petals = 8;
      const points = 200;
      // center hole for the timer
      const baseRadius = minDim * 0.55;
      const waveAmplitude = minDim * 0.18;
      const waveFrequency = 3.5;
      const timeFactor = time / 1200;
      const petalLengths = [1.5, 1.1, 0.7, 1.3, 0.9, 1.6, 0.8, 1.2, 1.4];
      const petalOffsets = [0, 0.7, 1.2, 0.3, 1.5, 0.5, 1.1, 0.2, 0.9];

      for (let p = 0; p < petals; p++) {
        const petalPhase = (2 * Math.PI * p) / petals;
        const lengthFactor = petalLengths[p % petalLengths.length];
        const offset = petalOffsets[p % petalOffsets.length];
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const t = i / points;
          const angle = 2 * Math.PI * t;
          // each petal has a different length and offset
          const radius =
            baseRadius +
            waveAmplitude *
              lengthFactor *
              Math.sin(waveFrequency * angle + petalPhase + offset + Math.sin(timeFactor + angle + offset)) +
            minDim * 0.08 * Math.sin(angle * petals + petalPhase + time / 1800 + offset);
          
          // smooth fade for the center
          const distanceFromCenter = Math.sqrt(Math.pow(Math.cos(angle), 2) + Math.pow(Math.sin(angle), 2));
          const fadeStart = 0.28; // fade begins (as a proportion of minDim)
          const fadeEnd = 0.05; // fade ends 
          const fadeFactor = Math.max(0, Math.min(1, (distanceFromCenter - fadeEnd) / (fadeStart - fadeEnd)));
          
          const r = radius * fadeFactor;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // for softer center fade
      const centerGradius = ctx.createRadialGradient(0, 0, 0, 0, 0, minDim * 0.4);
      centerGradius.addColorStop(0, 'rgba(0,0,0,1)');
      centerGradius.addColorStop(0.3, 'rgba(0,0,0,0.9)');
      centerGradius.addColorStop(0.6, 'rgba(0,0,0,0.5)');
      centerGradius.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = centerGradius;
      ctx.fillRect(-width, -height, width * 2, height * 2);
      ctx.restore();
    }

    function animate(time: number) {
      draw(time);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SpiralBackground;
