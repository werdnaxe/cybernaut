import React from 'react';
import Quiz from '../components/Quiz';

const About = () => {
  // const handleAnswer = (result) => {
  //   console.log('Quiz Result:', result); // true/false or selected option
  // };

  return (
    <div className="relative">
      <div className="p-6">
        <h1 className="text-3xl font-bold">About</h1>
      </div>

      {/* Quiz component below it */}
      {/* <Quiz
        options={['Cyberbullying', 'Privacy Settings', 'Algorithms', 'Digital Footprint']}
        correctAnswer="Digital Footprint"
        onAnswer={handleAnswer}
      /> */}
    </div>
  );
};

export default About;