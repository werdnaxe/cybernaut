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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-6 w-2/3 h-2/3">
        {options.map((option, index) => (
        <button
        key={index}
        onClick={() => handleClick(option)}
        className={`bg-blue-400 hover:bg-blue-500 text-black font-bold py-6 px-4 rounded-xl text-2xl transition-all duration-200 ${
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
