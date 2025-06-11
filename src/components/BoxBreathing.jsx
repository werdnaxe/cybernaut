import React from 'react';

const BoxBreathing = () => {
  const sideLength = 120;
  const centerX = 250;
  const centerY = 200;
  const halfSide = sideLength / 2;
  
  const point1 = { x: centerX - halfSide, y: centerY - halfSide }; // top left
  const point2 = { x: centerX + halfSide, y: centerY - halfSide }; // top right
  const point3 = { x: centerX + halfSide, y: centerY + halfSide }; // bottom right
  const point4 = { x: centerX - halfSide, y: centerY + halfSide }; // bottom left
  
  // Create the path for the square
  const squarePath = `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y} L ${point4.x} ${point4.y} Z`;
  
  // Total duration: 16 seconds (4 seconds per side)
  const totalDuration = 16;
  
  return (
    <div className="flex items-center justify-center min-h-96 bg-gray-50 p-8">
      <div className="relative">
        <svg width="500" height="400" viewBox="0 0 500 400">
          {/* Square outline */}
          <path
            d={squarePath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          
          {/* Animated progress line */}
          <path
            d={squarePath}
            fill="none"
            stroke="#1e40af"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="480"
            strokeDashoffset="480"
            className="animate-box-breathing-line"
          />
          
          <g className="text-center">
            <text
              x="250"
              y="210"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-inhale-text"
              style={{ fontFamily: 'Zing' }}
            >
              INHALE
            </text>
            <text
              x="250"
              y="210"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-hold1-text"
              style={{ fontFamily: 'Zing' }}
            >
              HOLD
            </text>
            <text
              x="250"
              y="210"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-exhale-text"
              style={{ fontFamily: 'Zing' }}
            >
              EXHALE
            </text>
            <text
              x="250"
              y="210"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-hold2-text"
              style={{ fontFamily: 'Zing' }}
            >
              HOLD
            </text>
          </g>
        </svg>
        
        <style jsx>{`
          @keyframes box-breathing-line {
            0% {
              stroke-dashoffset: 480;
            }
            25% {
              stroke-dashoffset: 360;
            }
            50% {
              stroke-dashoffset: 240;
            }
            75% {
              stroke-dashoffset: 120;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes inhale-text {
            0%, 25% {
              opacity: 1;
            }
            25.01%, 100% {
              opacity: 0;
            }
          }
          
          @keyframes hold1-text {
            0%, 25% {
              opacity: 0;
            }
            25.01%, 50% {
              opacity: 1;
            }
            50.01%, 100% {
              opacity: 0;
            }
          }
          
          @keyframes exhale-text {
            0%, 50% {
              opacity: 0;
            }
            50.01%, 75% {
              opacity: 1;
            }
            75.01%, 100% {
              opacity: 0;
            }
          }
          
          @keyframes hold2-text {
            0%, 75% {
              opacity: 0;
            }
            75.01%, 100% {
              opacity: 1;
            }
          }
          
          .animate-box-breathing-line {
            animation: box-breathing-line 16s linear infinite;
          }
          
          .animate-inhale-text {
            animation: inhale-text 16s linear infinite;
          }
          
          .animate-hold1-text {
            animation: hold1-text 16s linear infinite;
          }
          
          .animate-exhale-text {
            animation: exhale-text 16s linear infinite;
          }
          
          .animate-hold2-text {
            animation: hold2-text 16s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BoxBreathing;