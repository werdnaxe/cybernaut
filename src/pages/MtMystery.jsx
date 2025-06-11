import React from 'react'
import { useAuthContext } from '../features/users/AuthProvider';   // so we can lock modules based on progress

const MtMystery = () => {

  const { progress } = useAuthContext();
  if (!progress && progress !== null) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = progress !== null && progress !== undefined;
  const isDisabled1 = isLoggedIn ? progress.modules[4].isDisabled : false;
  const isDisabled2 = isLoggedIn ? progress.modules[5].isDisabled : false;
  const isDisabled3 = isLoggedIn ? progress.modules[6].isDisabled : false;
  const isDisabled4 = isLoggedIn ? progress.modules[7].isDisabled : false;

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
        disabled={isDisabled1}
        className="
        absolute top-100 left-155 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={() => window.location.href = '/MM1'}>
        Module 1
      </button>
      <button
        disabled={isDisabled2} 
        className="
        absolute top-125 left-140 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed">
        Module 2
      </button>
      <button
        disabled={isDisabled3}
        className="
        absolute top-150 left-170 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed">
        Module 3
      </button>
      <button
        disabled={isDisabled4}
        className="
        absolute top-173 left-133 bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed">
        Module 4
      </button>
    </div>
  )
}

export default MtMystery