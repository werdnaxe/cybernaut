import React from 'react';

const Narrator = ({ text, image, float }) => {
  return (
    <div className="w-[80vw] h-[80vh] mx-auto flex items-center justify-center">
      {/* Container flipped with row-reverse */}
      <div className="flex flex-row-reverse items-start gap-0 h-[80%]">
        {/* Speech Bubble */}
        <div
          className="relative bg-blue-200 rounded-3xl px-6 py-4 text-black font-semibold text-base shadow-md max-w-[40vw] min-w-[200px]"
          style={{ fontSize: '2rem', alignSelf: 'flex-start' }}
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
          className={`h-full object-contain z-10 ${float ? 'cybernaut-character' : ''}`}
        />
      </div>
    </div>
  );
};

export default Narrator;
