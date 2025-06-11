import React from 'react';

const BreathingTriangle = () => {
  const scale = 30;
  const side1 = 4 * scale; // inhale
  const side2 = 7 * scale; // hold  
  const side3 = 8 * scale; // exhale
  
  const height = Math.sqrt(side2 * side2 - (side1 * side1 + side2 * side2 - side3 * side3) * (side1 * side1 + side2 * side2 - side3 * side3) / (4 * side1 * side1));
  const point1 = { x: 250, y: 100 }; // top
  const point2 = { x: 100, y: 300 }; // bottom left
  const point3 = { x: 400, y: 300 }; // bottom right
  
  const totalPerimeter = side1 + side2 + side3;
  const totalDuration = totalPerimeter / scale; // 19 seconds total
  
  const trianglePath = `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y} Z`;
  
  const side1Duration = 4; // seconds
  const side2Duration = 7; // seconds  
  const side3Duration = 8; // seconds
  
  return (
    <div className="flex items-center justify-center min-h-96 bg-gray-50 p-8">
      <div className="relative">
        <svg width="500" height="400" viewBox="0 0 500 400">
          {/* Triangle outline */}
          <path
            d={trianglePath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          
          {/* Animated progress line */}
          <path
            d={trianglePath}
            fill="none"
            stroke="#1e40af"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="animate-breathing-line"
          />
          
          <g className="text-center">
            <text
              x="250"
              y="220"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-inhale-text"
              style={{ fontFamily: 'Zing' }}
            >
              INHALE
            </text>
            <text
              x="250"
              y="220"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-hold-text"
              style={{ fontFamily: 'Zing' }}
            >
              HOLD
            </text>
            <text
              x="250"
              y="220"
              textAnchor="middle"
              className="text-2xl font-semibold fill-blue-800 animate-exhale-text"
              style={{ fontFamily: 'Zing' }}
            >
              EXHALE
            </text>
          </g>
        </svg>
        
        <style jsx>{`
          @keyframes breathing-line {
            0% {
              stroke-dashoffset: 1000;
            }
            21.05% {
              stroke-dashoffset: 760;
            }
            57.89% {
              stroke-dashoffset: 550;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes inhale-text {
            0%, 21.05% {
              opacity: 1;
            }
            21.06%, 100% {
              opacity: 0;
            }
          }
          
          @keyframes hold-text {
            0%, 21.05% {
              opacity: 0;
            }
            21.06%, 57.89% {
              opacity: 1;
            }
            57.90%, 100% {
              opacity: 0;
            }
          }
          
          @keyframes exhale-text {
            0%, 57.89% {
              opacity: 0;
            }
            57.90%, 100% {
              opacity: 1;
            }
          }
          
          .animate-breathing-line {
            animation: breathing-line 19s linear infinite;
          }
          
          .animate-inhale-text {
            animation: inhale-text 19s linear infinite;
          }
          
          .animate-hold-text {
            animation: hold-text 19s linear infinite;
          }
          
          .animate-exhale-text {
            animation: exhale-text 19s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BreathingTriangle;