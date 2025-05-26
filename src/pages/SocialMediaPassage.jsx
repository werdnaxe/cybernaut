import React from 'react'

const SocialMediaPassage = () => {
  return (
    <div className="bg-blue-200 min-h-screen w-full flex items-center justify-center">
      {/* Back button */}
      <button
        className="bg-white hover:bg-grey text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl absolute top-40 left-20" onClick={() => window.location.href = '/destinations'}>
           Back
      </button>
      {/* Module buttons */}
      <div className="flex flex-col items-center space-y-6">
        <button
          className="bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
          Module 1
        </button>
        <button
          className="bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
          Module 2
        </button>
        <button
          className="bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
          Module 3
        </button>
        <button
          className="bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
          Module 4
        </button>
      </div>
    </div>
  )
}

export default SocialMediaPassage