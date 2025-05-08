import { useState } from 'react'
import React from 'react'
import './App.css'
import background from './assets/farthest-portal.png'

const App = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <h1>
        Hello CYBERNAUT
      </h1>
    </div>
  )
}

export default App
