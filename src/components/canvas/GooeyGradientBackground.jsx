import React, { useEffect, useRef } from 'react';
import './GooeyGradientBackground.css';

/**
 * GooeyGradientBackground
 * Interactive champagne gold ambient blobs on deep obsidian canvas.
 */
export function GooeyGradientBackground({
  children,
  className = '',
}) {
  const interactiveRef = useRef(null);

  useEffect(() => {
    let curX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let curY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    let tgX = curX;
    let tgY = curY;
    let animId = null;

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    const animate = () => {
      if (interactiveRef.current) {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <div className={`gooey-wrapper ${className}`}>
      <div className="gradient-bg">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div ref={interactiveRef} className="interactive"></div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default GooeyGradientBackground;
