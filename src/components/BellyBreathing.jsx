import React from 'react';

const BellyBreathing = () => {
  return (
    <div className="flex items-center justify-center min-h-96 bg-gray-50 p-8">
      <div className="relative">
        <svg width="500" height="400" viewBox="0 0 500 400">
          {/* Breathing circle--expands and contracts */}
          <circle
            cx="250"
            cy="200"
            r="100"
            fill="none"
            stroke="#1e40af"
            strokeWidth="4"
            className="animate-belly-breathing-circle"
            style={{ transformOrigin: '250px 200px' }}
          />
          
          {/* Inner circle (static) */}
          <circle
            cx="250"
            cy="200"
            r="80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="5,5"
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
              className="text-2xl font-semibold fill-blue-800 animate-exhale-text"
              style={{ fontFamily: 'Zing' }}
            >
              EXHALE
            </text>
          </g>
        </svg>
        
        <style jsx>{`
          @keyframes belly-breathing-circle {
            0% {
              transform: scale(0.67);
            }
            50% {
              transform: scale(1.33);
            }
            100% {
              transform: scale(0.67);
            }
          }
          
          @keyframes inhale-text {
            0%, 50% {
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
            50.01%, 100% {
              opacity: 1;
            }
          }
          
          .animate-belly-breathing-circle {
            animation: belly-breathing-circle 12s ease-in-out infinite;
          }
          
          .animate-inhale-text {
            animation: inhale-text 12s ease-in-out infinite;
          }
          
          .animate-exhale-text {
            animation: exhale-text 12s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BellyBreathing;