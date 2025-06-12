import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../features/users/AuthProvider';
import background from '../assets/farthest-portal.png';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import Narrator from '../components/Narrator';
import './Cybernaut.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthContext();   // for adding user's name to welcome message

  const handleContinueClick = () => {
    navigate('/destinations'); // Navigate to destinations page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main content container */}
      <div className="h-screen flex items-center font-zing text-center justify-center relative">
        
        {/* Narrator Component - Scaled up for homepage with zoom-responsive scaling */}
        <div 
          style={{
            transform: 'scale(2.0)',
            transformOrigin: 'center',
            maxWidth: '95vw',
            maxHeight: '90vh'
          }}
        >
          <Narrator className="text-center"
            text="Hi! I'm Cybernaut. Click the continue button to start your journey!"
            image={cybernautCharacter}
            float         
          />
        </div>

        {/* CONTINUE button - positioned bottom right */}
        <div 
          className="absolute"
          style={{
            bottom: '10%',
            right: '8%'
          }}
        >
          <button 
            onClick={handleContinueClick}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-zing font-bold py-3 px-7 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;