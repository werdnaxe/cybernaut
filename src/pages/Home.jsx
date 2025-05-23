import React, { useState } from 'react';
import background from '../assets/farthest-portal.png';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import './Cybernaut.css';

function Home() {
  // State for controlling continue button visibility
  const [showContinueButton, setShowContinueButton] = useState(true);

  // handle continue button click
  const handleContinueClick = () => {
    setShowContinueButton(false);
  };

  return (
    <div 
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        minHeight: '100vh'
      }}
    >
      <header className="p-6 flex justify-between items-center">
        <h1>Hello CYBERNAUT</h1>
      </header>

      {/* Character Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
           style={{ width: "33%", marginTop: "20px" }}>
        <div className="relative">
          {/* Speech Bubble */}
          <div className="absolute speech-bubble-custom bg-blue-200 rounded-3xl p-3 w-64 z-20"
               style={{ 
                 top: "-60px", 
                 right: "-80px",
               }}>
            <p className="font-bold text-lg text-center">HI! I'M YOUR CYBERNAUT.</p>
          </div>
          
          {/* Character Image */}
          <img 
            src={cybernautCharacter} 
            alt="Cybernaut Character" 
            className="cybernaut-character mx-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 right-16 transform -translate-y-1/2 flex flex-col space-y-4">
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
          EDUCATORS
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
          STUDENTS
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
          CUSTOMIZE YOUR CYBERNAUT
        </button>
      </div>
      
      {/* Continue Button */}
      {showContinueButton && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={handleContinueClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Click to Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
