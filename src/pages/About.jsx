import React, { useState } from 'react';
import Quiz from '../components/Quiz';

const About = () => {
  const [result, setResult] = useState(null);

  const handleAnswer = (answerResult) => {
    setResult(answerResult);
  };

  return (
    <div className="relative text-center">
      <div className="p-6">
        <h1 className="text-3xl font-bold">About</h1>
      </div>

      {/* Quiz component */}
      {/* <Quiz
        options={['Cyberbullying', 'Privacy Settings', 'Algorithms', 'Digital Footprint']}
        onAnswer={handleAnswer}
      /> */}

      {/* Display result */}
      {/* {result !== null && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-6 py-4 rounded-xl shadow-lg text-2xl font-semibold text-blue-800">
          {typeof result === 'boolean'
            ? result
              ? 'Correct!'
              : 'Oops! Try again.'
            : `You selected: ${result}`}
        </div>
      )} */}
    </div>
  );
};

export default About;