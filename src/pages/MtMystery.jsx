import React from 'react'

const MtMystery = () => {
  return (
    <div className="relative bg-[url('src/assets/mtmysterypath.png')] bg-top bg-no-repeat min-h-[100vh] w-full p-5">
      {/* Back button */}
      <button
        className="absolute top-10 left-10 bg-white hover:bg-grey text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl"
        onClick={() => window.location.href = '/destinations'}>
        Back
      </button>
      {/* Module buttons - each with its own absolute position */}
      <button
        className="absolute top-100 left-155 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 1
      </button>
      <button
        className="absolute top-125 left-140 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 2
      </button>
      <button
        className="absolute top-150 left-170 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 3
      </button>
      <button
        className="absolute top-173 left-133 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl">
        Module 4
      </button>
    </div>
  )
}

export default MtMystery