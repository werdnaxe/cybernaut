import React from 'react';

const Destinations = () => {
  return (
    <div className="bg-[url('src/assets/destinationsimage.png')] h-[1000px] flex justify-center items-center p-5">
        <div className="flex flex-row items-center space-y-5">
            <button
                className="bg-[#537fb2] hover:bg-[#436b9a] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl absolute top-110 left-160" onClick={() => window.location.href = '/mysterymountain'}>
                  Mountains of Mystery
            </button>
            <button
                className="bg-[#90cddb] hover:bg-[#72acba] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl absolute top-210 left-50" onClick={() => window.location.href = '/SocialMediaPassage'}>
                  Social Media Safe Passage
            </button>
            <button
                className="bg-[#7ba0ba] hover:bg-[#67889e] text-black font-zing font-bold py-3 px-10 rounded-full text-center option-button text-2xl absolute top-215 left-210" onClick={() => window.location.href = '/DataDetoxPit'}>
                  Data Detox Pit
            </button>
        </div>
    </div>
  );
};

export default Destinations;