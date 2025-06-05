import React from 'react';

const Narrator = ({ text, image, float }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Container flipped with row-reverse */}
      <div className="flex flex-row-reverse items-end gap-0 w-full h-full px-4 -translate-y-40 -translate-x-10">
        {/* Speech Bubble */}
        <div
          className="relative bg-blue-200 rounded-3xl px-6 py-4 text-black font-semibold text-base shadow-md w-full max-w-[500px] -ml-10 -translate-y-50"
          style={{ fontSize: '1.25rem' }}
        >
        <p>{text}</p>

        {/* Tail flipped to point right */}
        <div
        className="absolute"
        style={{
            top: 'calc(100% - 8px)',  // slightly overlapping to remove gap
            left: '20px',             // move tail to left side of bubble
            width: 0,
            height: 0,
            borderLeft: '24px solid transparent',
            borderRight: '24px solid transparent',
            borderTop: '24px solid #bfdbfe',
            transform: 'rotate(15deg)', // slight upward-right angle
        }}
        />
        </div>

        {/* Character on the right */}
        <img
          src={image}
          alt="Narrator Character"
          className={`h-[500px] object-contain z-10 ${float ? 'cybernaut-character' : ''}`}
          style={{ transform: 'translateY(200px)' }}
        />
      </div>
    </div>
  );
};

export default Narrator;
