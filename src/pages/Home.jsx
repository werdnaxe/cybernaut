import React, { useState } from 'react';
import background from '../assets/farthest-portal.png';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import './Cybernaut.css';
import Narrator from '../components/Narrator';

function Home() {
  // State for controlling continue button visibility
  const [showContinueButton, setShowContinueButton] = useState(true);

  // handle continue button click
  const handleContinueClick = () => {
    setShowContinueButton(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-auto"
      style={{ 
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      <h1 className="text-white font-zing p-4">Hello CYBERNAUT</h1>

      {/* Narrator and Buttons */}
      <div className="flex font-zing flex-col items-center justify-center relative z-10 mt-20">
        <Narrator
          text="HI! I'M YOUR CYBERNAUT."
          image={cybernautCharacter}
          float
        />

      {/* Navigation Buttons */}
        <div className="absolute z-22 top-[25%] left-[62%] transform -translate-x-1/2 flex flex-col items-center space-y-4 w-[30vw]">
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold font-zing py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
            EDUCATORS
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold font-zing py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
            STUDENTS
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold font-zing py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
            CUSTOMIZE YOUR CYBERNAUT
          </button>
        </div>
      </div>
      
      {/* Continue Button */}
      {showContinueButton && (
        <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={handleContinueClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold font-zing py-3 px-8 rounded-lg"
          >
            Click to Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
