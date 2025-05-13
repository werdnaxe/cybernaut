import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../assets/farthest-portal.png';
import cybernautCharacter from '../assets/standing-cybernaut.png';
import './Cybernaut.css';

function Home() {
  // state for creating new user data (React controls the value of the input field)
  const [newUsername, setNewUserName] = useState('');
  
  // state for fetching existing user data
  const [data, setData] = useState([]);

  // State for controlling continue button visibility
  const [showContinueButton, setShowContinueButton] = useState(true);

  // POST (create) user when button is clicked
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

  // GET user by id
  const fetchUserByID = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/681bef98aae7a2a61ceed06f');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // React hook to fetch data upon initial rendering of component (this is a side effect)
  useEffect(() => {
    fetchUserByID();
  }, []);

  // handle continue button click
  const handleContinueClick = () => {
    setShowContinueButton(false);
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        minHeight: '100vh'
      }}
    >
      <h1>
        Hello CYBERNAUT
      </h1>
      
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

      {/* Character Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
           style={{ width: "33%", marginTop: "20px" }}>
        <div className="relative">
          {/* Speech Bubble */}
          <div className="absolute speech-bubble-custom bg-blue-200 rounded-3xl p-3 w-64 z-20"
               style={{ 
                 top: "-60px", 
                 right: "-80px",
               }}>
            <p className="font-bold text-lg text-center">HI! I'M YOUR CYBERNAUT.</p>
          </div>
          
          {/* Character Image */}
          <img 
            src={cybernautCharacter} 
            alt="Cybernaut Character" 
            className="cybernaut-character mx-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 right-16 transform -translate-y-1/2 flex flex-col space-y-4">
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
      
      {/* Continue Button */}
      {showContinueButton && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
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