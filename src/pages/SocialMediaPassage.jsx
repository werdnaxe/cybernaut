import React from 'react'
import socmedpassImage from '../assets/socmedpass.png' // Import the image
import { useAuthContext } from '../features/users/AuthProvider';   // so we can lock modules based on progress

const SocialMediaPassage = () => {

  const { progress } = useAuthContext();
  if (!progress && progress !== null) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = progress !== null && progress !== undefined;
  const isDisabled2 = isLoggedIn ? progress.modules[1].isDisabled : false;
  const isDisabled3 = isLoggedIn ? progress.modules[2].isDisabled : false;
  const isDisabled4 = isLoggedIn ? progress.modules[3].isDisabled : false;

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${socmedpassImage})` }} // Use the imported image
    >
      {/* Back button */}
      <button
        className="absolute top-10 left-10 bg-white hover:bg-gray-200 text-black font-zing font-bold py-3 px-10 rounded-full text-center text-2xl"
        onClick={() => window.location.href = '/destinations'}>
        Back
      </button>
      
      {/* Module buttons - each with its own absolute position */}
      <button
        className="absolute top-100 left-147 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center text-2xl"
        onClick={() => window.location.href = '/SMSPModule1'}
      > 
        Module 1
      </button>
      
      <button
        disabled={isDisabled2}      
        className="
        absolute top-120 left-178 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={() => window.location.href = '/skeleton-smsp2'}
      >
        Module 2
      </button>
      
      <button
        disabled={isDisabled3}      
        className="
        absolute top-145 left-155 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={() => window.location.href = '/SMSPModule3'}>
        Module 3
      </button>
    </div>
  )
}

export default SocialMediaPassage