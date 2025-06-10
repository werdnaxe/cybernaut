import React from 'react';

const Narrator = ({ text, image, float }) => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[400px] p-4">
      {/* Main container with character on left, speech bubble on right */}
      <div className="flex items-start justify-center gap-6 w-full max-w-4xl">
        
        {/* Character on the left */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt="Narrator Character"
            className={`h-64 sm:h-80 md:h-96 w-auto object-contain ${float ? 'cybernaut-character' : ''}`}
            style={{ 
              height: 'clamp(16rem, 20rem, 24rem)', // Fixed height range
              width: 'auto' 
            }}
          />
        </div>

        {/* Speech Bubble on the right, positioned towards top */}
        <div 
          className="relative bg-blue-200 rounded-3xl px-4 py-3 sm:px-6 sm:py-4 text-black font-semibold shadow-md max-w-xs sm:max-w-sm md:max-w-md flex-shrink-0 mt-8 sm:mt-12 md:mt-16"
          style={{
            // Fixed positioning and sizing
            marginTop: '4rem',
            maxWidth: '20rem',
            padding: '1rem 1.5rem'
          }}
        >
          <p 
            className="leading-relaxed"
            style={{
              // Font size that responds to zoom: 12pt at 100% zoom, bounded by 10pt-20pt
              fontSize: 'clamp(10pt, calc(0.75rem + 0.5vw), 20pt)',
              lineHeight: '1.4'
            }}
          >
            {text}
          </p>

          {/* Speech bubble tail pointing toward character (to the left) */}
          <div
            className="absolute"
            style={{
              top: '30px',
              left: '-16px',
              width: 0,
              height: 0,
              borderTop: '16px solid transparent',
              borderBottom: '16px solid transparent',
              borderRight: '16px solid #bfdbfe',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Narrator;