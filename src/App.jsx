import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GradeLevel from './pages/GradeLevel';
import UserForm from './features/users/UserForm';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/grade-level" element={<GradeLevel />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;
