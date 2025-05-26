import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../assets/farthest-portal.png';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import './Cybernaut.css';
import Narrator from '../components/Narrator';

function Home() {
  const [newUsername, setNewUserName] = useState('');
  const [data, setData] = useState([]);
  const [showContinueButton, setShowContinueButton] = useState(true);

  const createUser = async () => {
    try {
      const payload = { 
        username: newUsername, 
        email: `${newUsername}@example.com`,
        password: 'defaultpassword' 
      };
      const response = await axios.post('http://localhost:5000/api/users', payload);
      const newUser = response.data;
      console.log('User created:', newUser);
      setNewUserName('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const fetchUserByID = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/681bef98aae7a2a61ceed06f');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserByID();
  }, []);

  const handleContinueClick = () => {
    setShowContinueButton(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-auto"
      style={{ 
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      <h1 className="text-white p-4">Hello CYBERNAUT</h1>

      {/* POST widget */}
      <div className="mb-4 p-4">
        <input
          type="text"
          value={newUsername}
          onChange={e => setNewUserName(e.target.value)}
          placeholder="Enter new username"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={createUser}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {/* Fetched user data */}
      <div className="text-white p-4">
        <p>Username: {data.username}</p>
        <p>Email: {data.email}</p>
        <p>Password: {data.password}</p>
      </div>

      {/* Narrator and Buttons */}
      <div className="flex flex-col items-center justify-center relative z-10 mt-[-20vh]">
        <Narrator
          text="HI! I'M YOUR CYBERNAUT."
          image={cybernautCharacter}
          float
        />

        {/* Navigation Buttons */}
        <div className="absolute z-22 top-[40%] left-[61%] transform -translate-x-1/2 flex flex-col items-center space-y-4 w-[30vw]">
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
            EDUCATORS
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
            STUDENTS
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-10 rounded-full w-72 text-center option-button text-lg">
            CUSTOMIZE YOUR CYBERNAUT
          </button>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 right-16 transform -translate-y-1/2 flex flex-col space-y-4">
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-zing font-bold py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
          EDUCATORS
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-zing font-bold py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
          STUDENTS
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-black font-zing font-bold py-3 px-10 rounded-full w-72 text-center option-button text-2xl">
          CUSTOMIZE YOUR CYBERNAUT
        </button>
      </div>
      
      {/* Continue Button */}
      {showContinueButton && (
        <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={handleContinueClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Click to Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;