import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GradeLevel from './pages/GradeLevel'; // added
import Destinations from './pages/Destinations'; // added
import MtMystery from './pages/MtMystery'; // added
import DataDetoxPit from './pages/DataDetoxPit'; // added
import SocialMediaPassage from './pages/SocialMediaPassage'; // added

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/grade-level" element={<GradeLevel />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/mysterymountain" element={<MtMystery />} />
        <Route path="/SocialMediaPassage" element={<SocialMediaPassage />} />
        <Route path="/datadetoxpit" element={<DataDetoxPit />} />
      </Routes>
    </div>
  );
}

export default App;
