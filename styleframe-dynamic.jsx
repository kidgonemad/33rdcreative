import React, { useState, useEffect, useRef } from 'react';

const projects = [
  { name: 'Oakley', url: 'styleframe.de/project/mars', bg: 'linear-gradient(135deg, #1a0800 0%, #6b3520 50%, #2d1000 100%)' },
  { name: 'Teenage Engineering', url: 'styleframe.de/project/teenage-engineering', bg: 'linear-gradient(135deg, #ff8040 0%, #e06020 50%, #cc4400 100%)' },
  { name: 'Ray-Ban', url: 'styleframe.de/project/innovation-lab', bg: 'linear-gradient(135deg, #404040 0%, #1a1a1a 50%, #000000 100%)' },
  { name: 'Samsung', url: 'styleframe.de/project/beats-n-buckets', bg: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)' },
  { name: 'Moncler', url: 'styleframe.de/project/moncler-grenoble', bg: 'linear-gradient(135deg, #6050a0 0%, #403070 50%, #201840 100%)' },
  { name: 'Oakley', url: 'styleframe.de/project/13-11', bg: 'linear-gradient(135deg, #9070c0 0%, #6050a0 50%, #403070 100%)' },
  { name: 'We Are Rewind', url: 'styleframe.de/project/we-are-rewind', bg: 'linear-gradient(135deg, #e8ff20 0%, #d0e800 50%, #b0c800 100%)' },
  { name: 'Hatton Labs', url: 'styleframe.de/project/hatton-labs-x-ap', bg: 'linear-gradient(135deg, #303030 0%, #181818 50%, #080808 100%)' },
];

export default function StyleframeStack() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [targetPos, setTargetPos] = useState({ x: 0.5, y: 0.5 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const animRef = useRef();

  useEffect(() => {
    const animate = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.06,
        y: prev.y + (targetPos.y - prev.y) * 0.06
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [targetPos]);

  const handleMouseMove = (e) => {
    setTargetPos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // Dynamic POV - more dramatic rotation based on mouse
  // Mouse at top = looking down from above
  // Mouse at bottom = looking up from below
  const rotateX = 25 - (mousePos.y * 40); // +25 (top) to -15 (bottom)
  const rotateY = -25 + (mousePos.x * 35); // -25 (left) to +10 (right)
  
  // Perspective origin follows mouse
  const perspX = 30 + (mousePos.x * 40);
  const perspY = 30 + (mousePos.y * 40);

  const cursorColor = hoveredIndex >= 0 ? '#fff' : '#ff4500';

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#f2f2f2',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'none',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Cursor */}
      <div style={{
        position: 'fixed',
        left: cursorPos.x,
        top: cursorPos.y,
        width: 18,
        height: 18,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10000,
      }}>
        <div style={{
          position: 'absolute',
          width: 1.5,
          height: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          background: cursorColor,
          transition: 'background 0.12s',
        }} />
        <div style={{
          position: 'absolute',
          width: 18,
          height: 1.5,
          top: '50%',
          transform: 'translateY(-50%)',
          background: cursorColor,
          transition: 'background 0.12s',
        }} />
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 11,
        letterSpacing: 1,
        color: '#aaa',
      }}>
        Drag
      </div>

      {/* 3D Scene - perspective origin moves with mouse */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: 1400,
        perspectiveOrigin: `${perspX}% ${perspY}%`,
      }}>
        {/* Stack */}
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '35%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.12s ease-out',
        }}>
          {projects.map((project, i) => {
            const isHovered = hoveredIndex === i;
            
            const x = i * 55;
            const y = i * -35;
            const z = i * -30;
            
            const hoverY = y - 120;
            
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{
                  position: 'absolute',
                  transformStyle: 'preserve-3d',
                  transform: isHovered 
                    ? `translate3d(${x}px, ${hoverY}px, ${z}px)`
                    : `translate3d(${x}px, ${y}px, ${z}px)`,
                  zIndex: i,
                  transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                {/* Card */}
                <div style={{
                  width: 340,
                  height: 230,
                  borderRadius: 2,
                  overflow: 'hidden',
                  background: project.bg,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
                  cursor: 'none',
                }} />
                
                {/* Label */}
                <div style={{
                  position: 'absolute',
                  left: 360,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 42,
                  fontWeight: 300,
                  color: '#1a1a1a',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.02em',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}>
                  {project.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* URL */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 12,
        color: '#888',
        opacity: hoveredIndex >= 0 ? 1 : 0,
        transition: 'opacity 0.2s',
      }}>
        {hoveredIndex >= 0 ? projects[hoveredIndex].url : ''}
      </div>

      {/* Scroll */}
      <div style={{
        position: 'absolute',
        bottom: 25,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 16,
        color: '#bbb',
      }}>
        ↓
      </div>
    </div>
  );
}
