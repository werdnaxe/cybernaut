import React from 'react';

const Destinations = () => {
  return (
    <div className="bg-[url('src/assets/destinationsimage.png')] h-[1000px] flex justify-center items-center p-5">
        <div className="flex flex-row items-center space-y-5">
            <button
                className="bg-[url('src/assets/mysterymountainbutton.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none absolute top-30 left-220"
                style={{
                  clipPath: "ellipse(60% 15% at center)",
                }} onClick={() => window.location.href = '/mysterymountain'}>
            </button>
            <button
                className="bg-[url('src/assets/socialmediasafepassagebutton.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none absolute top-160 left-30"
                style={{
                  clipPath: "ellipse(60% 15% at center)",
                }} onClick={() => window.location.href = '/SocialMediaPassage'}>
            </button>
            <button
                className="bg-[url('src/assets/datadetoxpitbutton.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none absolute top-166 left-183"
                style={{
                  clipPath: "ellipse(60% 15% at center)",
                }} onClick={() => window.location.href = '/DataDetoxPit'}>
            </button>
        </div>
    </div>
  );
};

export default Destinations;