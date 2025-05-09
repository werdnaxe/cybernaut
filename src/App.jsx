import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import background from './assets/farthest-portal.png'
import axios from 'axios'

function App () {

  // state for creating new user data (React controls the value of the input field)
  const [newUsername, setNewUserName] = useState('')
  
  // state for fetching existing user data
  const [data, setData] = useState([])

  // POST (create) user when button is clicked
  const createUser = async () => {
    try {
      const payload = { 
        username: newUsername, 
        email: `${newUsername}@example.com`,
        password: 'defaultpassword' 
      }
      const response = await axios.post('http://localhost:5000/api/users', payload)
      const newUser = response.data
      console.log('User created:', newUser)
      setNewUserName('')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  // GET user by id
  const fetchUserByID = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/681bef98aae7a2a61ceed06f')
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // React hook to fetch data upon initial rendering of component (this is a side effect)
  useEffect(( ) => {
    fetchUserByID()
  }, [])
  
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
      >
      <h1>
        Hello CYBERNAUT
      </h1>

      {/* POST widget */}
      <div className="mb-4">
        <input
          type = "text"
          value = {newUsername}
          onChange = {e => setNewUserName(e.target.value)}
          placeholder = "Enter new username"
          className = "border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick = {createUser}
          className = "bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {/* Fetched user data */}
      <p>Username: {data.username}</p>
      <p>Email: {data.email}</p>
      <p>Password: {data.password}</p>

    </div>
  )
}

export default App
