import React, { useState } from 'react';

const Quiz = ({ options, correctAnswer = null, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    setSelected(option);
    if (onAnswer) {
      if (correctAnswer !== null) {
        onAnswer(option === correctAnswer);
      } else {
        onAnswer(option);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-6 w-fit mx-auto">
        {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-6 rounded-xl text-2xl transition-all duration-200 whitespace-normal leading-snug w-full ${
            selected === option ? 'ring-4 ring-yellow-300' : ''
          }`}
        >
          {option}
        </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
