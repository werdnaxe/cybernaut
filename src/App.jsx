import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GradeLevel from './pages/GradeLevel';
import UserForms from './pages/UserForms';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './features/users/PrivateRoute';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/grade-level" element={<GradeLevel />} />
        <Route path="/user-forms" element={<UserForms />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
