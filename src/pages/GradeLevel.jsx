import React from 'react';

const GradeLevel = () => {
  return (
    <div
      className="bg-[url('src/assets/farthest-portal.png')] min-h-screen flex justify-center items-center p-5"
    >
      <div className="flex flex-row items-center space-y-5">
        <button
          className="bg-[url('src/assets/Button1.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none"
          style={{
            clipPath: "ellipse(36% 36% at center)", // Example shape
          }}>
        </button>
        <button
          className="bg-[url('src/assets/Button2.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none"
          style={{
            clipPath: "ellipse(36% 36% at center)", // Example shape
          }}>
        </button>
        <button
          className="bg-[url('src/assets/Button3.png')] bg-cover bg-no-repeat border-none w-[440px] h-[440px] cursor-pointer focus:outline-none"
          style={{
            clipPath: "ellipse(36% 36% at center)", // Example shape
          }}>
        </button>
      </div>
    </div>
  );
};

export default GradeLevel;