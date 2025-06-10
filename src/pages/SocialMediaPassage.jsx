import React from 'react'
import socmedpassImage from '../assets/socmedpass.png' // Import the image

const SocialMediaPassage = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${socmedpassImage})` }} // Use the imported image
    >
      {/* Back button */}
      <button
        className="absolute top-10 left-10 bg-white hover:bg-gray-200 text-black font-bold py-3 px-10 rounded-full text-center text-2xl"
        onClick={() => window.location.href = '/destinations'}>
        Back
      </button>
      
      {/* Module buttons - each with its own absolute position */}
      <button
        className="absolute top-100 left-147 bg-[#90cddb] hover:bg-[#72acba] text-black font-bold py-3 px-10 rounded-full text-center text-2xl" 
        onClick={() => window.location.href = '/SMSPModule1'}
      > 
        Module 1
      </button>
      
      <button
        className="absolute top-120 left-178 bg-[#90cddb] hover:bg-[#72acba] text-black font-bold py-3 px-10 rounded-full text-center text-2xl"
        onClick={() => window.location.href = '/skeleton-smsp2'}
      >
        Module 2
      </button>
      
      <button
        className="absolute top-145 left-155 bg-[#90cddb] hover:bg-[#72acba] text-black font-bold py-3 px-10 rounded-full text-center text-2xl">
        Module 3
      </button>
      
      <button
        className="absolute top-170 left-178 bg-[#90cddb] hover:bg-[#72acba] text-black font-bold py-3 px-10 rounded-full text-center text-2xl">
        Module 4
      </button>
    </div>
  )
}

export default SocialMediaPassage