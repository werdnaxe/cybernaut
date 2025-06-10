import React from 'react'

const SocialMediaPassage = () => {
  return (
    <div className="relative bg-[url('src/assets/socmedpass.png')] min-h-screen w-full">
      {/* Back button */}
      <button
        className="absolute top-10 left-10 bg-white hover:bg-grey text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl"
        onClick={() => window.location.href = '/destinations'}>
        Back
      </button>
      {/* Module buttons - each with its own absolute position */}
      <button
        className="absolute top-100 left-147 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 1
      </button>
      <button
        className="absolute top-120 left-178 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 2
      </button>
      <button
        className="absolute top-145 left-155 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 3
      </button>
      <button
        className="absolute top-170 left-178 bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 4
      </button>
    </div>
  )
}

export default SocialMediaPassage