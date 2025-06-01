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
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      // Make the spiral responsive to viewport size and orientation
      const minDim = Math.min(width, height);
      // Use a scale that adapts to the aspect ratio for mobile
      const aspectRatio = width / height;
      // On tall screens (phones), reduce scale a bit to fit
      const spiralScale = aspectRatio < 1 ? 0.48 : 0.62;
      ctx.translate(width / 2, height / 2);
      ctx.scale(spiralScale, spiralScale);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = 0.25;

      const petals = 24;
      const points = 200;
      // Make the center hole and lobes responsive as well
      // Increase baseRadius for a larger outer circle
      const baseRadius = minDim * (aspectRatio < 1 ? 0.48 : 0.55) + minDim * 0.06 * Math.sin(time / 2000);
      // Increase waveAmplitude for more space between patterns
      const waveAmplitude = (aspectRatio < 1 ? 68 : 82) + (aspectRatio < 1 ? 16 : 22) * Math.sin(time / 1500);
      const waveFrequency = 7;
      for (let p = 0; p < petals; p++) {
        // Animate the rotation slightly for a subtle hypnotic effect
        const rotation = (2 * Math.PI * p) / petals + 0.12 * Math.sin(time / 4000);
        ctx.save();
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const t = i / points;
          const angle = 2 * Math.PI * t;
          const radius = baseRadius + waveAmplitude * Math.sin(waveFrequency * angle);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
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
