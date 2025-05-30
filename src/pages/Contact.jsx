import React from 'react'
import Narrator from '../components/Narrator';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import emptyProfile from '../assets/emptyprofile.jpg';

const Contact = () => {
return (
  <div className="min-h-screen w-full relative text-center bg-[#275481] font-zing p-8">
    <Narrator
      text="Hello, I'm Cybernaut! Want to contact us?"
      image={cybernautCharacter}
    />

    {/* Developer Profiles */}
    <div className="flex flex-col items-center space-y-10">
      {/* Developer 1 */}
      <div className="flex items-center space-x-3 bg-white p-4 rounded-xl w-full max-w-3xl">
        <img src={emptyProfile} alt="Developer 1" className="w-24 h-24 rounded-full object-cover" />
        <div className="text-left text-blck">
          <h3 className="text-2xl font-bold text-[#3b5982]">Charlotte Larson Freeman</h3>
          <h4 className="text-xl font-bold">example@gmail.com | (123)-456-7890</h4>
          <p className="text-sm">Frontend engineer</p>
        </div>
      </div>

      {/* Developer 2 */}
      <div className="flex items-center space-x-6 bg-white p-4 rounded-lg w-full max-w-3xl">
        <img src={emptyProfile} alt="Developer 2" className="w-24 h-24 rounded-full object-cover" />
        <div className="text-left text-black">
          <h3 className="text-2xl font-bold text-[#3b5982]">Andrew Essex</h3>
          <h4 className="text-xl font-bold">example@gmail.com | (123)-456-7890</h4>
          <p className="text-sm">Backend engineer</p>
        </div>
      </div>

      {/* Developer 3 */}
      <div className="flex items-center space-x-6 bg-white p-4 rounded-lg w-full max-w-3xl">
        <img src={emptyProfile} alt="Developer 3" className="w-24 h-24 rounded-full object-cover" />
        <div className="text-left text-black">
          <h3 className="text-2xl font-bold text-[#3b5982]">Daniel Szarkowicz</h3>
          <h4 className="text-xl font-bold">example@gmail.com | (123)-456-7890</h4>
          <p className="text-sm">Frontend engineer</p>
        </div>
      </div>

      {/* Developer 4 */}
      <div className="flex items-center space-x-6 bg-white p-4 rounded-lg w-full max-w-3xl">
        <img src={emptyProfile} alt="Developer 3" className="w-24 h-24 rounded-full object-cover" />
        <div className="text-left text-black">
          <h3 className="text-2xl font-bold text-[#3b5982]">Linnea Olix</h3>
          <h4 className="text-xl font-bold">example@gmail.com | (123)-456-7890</h4>
          <p className="text-sm">Frontend engineer</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Contact;
