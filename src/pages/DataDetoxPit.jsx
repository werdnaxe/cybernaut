import React from 'react'
import { useAuthContext } from '../features/users/AuthProvider';   // so we can lock modules based on progress

const DataDetoxPit = () => {

  const { progress } = useAuthContext();
  if (!progress && progress !== null) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = progress !== null && progress !== undefined;
  const isDisabled1 = isLoggedIn ? progress.modules[8].isDisabled : false;
  const isDisabled2 = isLoggedIn ? progress.modules[9].isDisabled : false;
  const isDisabled3 = isLoggedIn ? progress.modules[10].isDisabled : false;
  const isDisabled4 = isLoggedIn ? progress.modules[11].isDisabled : false;

  return (
    <div className="relative bg-[url('src/assets/datadetoxpath.png')] min-h-screen w-full">
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
        absolute top-80 left-150 bg-[#7ba0ba] hover:bg-[#67889e] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed">
        Module 1
      </button>
      <button
        disabled={isDisabled2}
        className="
        absolute top-100 left-135 bg-[#7ba0ba] hover:bg-[#67889e] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={() => window.location.href = '/DDP2'}>
        Module 2
      </button>
      <button
        disabled={isDisabled3}
        className="
        absolute top-120 left-165 bg-[#7ba0ba] hover:bg-[#67889e] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl
        disabled:bg-gray-500 disabled:cursor-not-allowed">
        Module 3
      </button>
    </div>
  )
}

export default DataDetoxPit