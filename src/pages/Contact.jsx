import React from 'react'
import Narrator from '../components/Narrator';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import emptyProfile from '../assets/emptyprofile.jpg';

const Contact = () => {
  return (
      <div className="font-zing bg-[#275481] min-h-screen text-center p-6">
        <Narrator
          text="Hello, I'm Cybernaut! Want to contact us?"
          image={cybernautCharacter}
        />

        <div className="flex flex-col items-center space-y-10">
          {/*Dev 1*/}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg w-full max-w-3xl">
            <img src={emptyProfile} alt="Profile picture" className="w-24 h-24 rounded-full object-cover"/>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#275481]">Charlotte Larsen Freeman</h3>
              <h4 className="text-lg text-black">example@email.com | (123)-456-7890</h4>
              <p className="text-sm">Head develeoper</p>
            </div>
          </div>

          {/*Dev 2*/}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg w-full max-w-3xl">
            <img src={emptyProfile} alt="Profile picture" className="w-24 h-24 rounded-full object-cover"/>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#275481]">Andrew Essex</h3>
              <h4 className="text-lg text-black">example@email.com | (123)-456-7890</h4>
              <p className="text-sm">Backend developer</p>
            </div>
          </div>

          {/*Dev 3*/}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg w-full max-w-3xl">
            <img src={emptyProfile} alt="Profile picture" className="w-24 h-24 rounded-full object-cover"/>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#275481]">Daniel Szarkowicz</h3>
              <h4 className="text-lg text-black">example@email.com | (123)-456-7890</h4>
              <p className="text-sm">Frontend develeoper</p>
            </div>
          </div>

          {/*Dev 4*/}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg w-full max-w-3xl">
            <img src={emptyProfile} alt="Profile picture" className="w-24 h-24 rounded-full object-cover"/>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#275481]">Linnea Olix</h3>
              <h4 className="text-lg text-black">example@email.com | (123)-456-7890</h4>
              <p className="text-sm">Frontend developer</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Contact