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
import Destinations from './pages/Destinations'; // added
import MtMystery from './pages/MtMystery'; // added
import DataDetoxPit from './pages/DataDetoxPit'; // added
import SocialMediaPassage from './pages/SocialMediaPassage'; // added
import ModuleTest from './pages/ModuleTest';

import SMSPModule1 from './pages/modules/SMSPModule1';

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
        <Route path="/user-forms" element={<UserForms />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/destinations" element={<Destinations />} /> 
        <Route path="/module-test" element={<ModuleTest />} />

        <Route path="/SMSPModule1" element={<SMSPModule1 />} />
      </Routes>
    </div>
  );
}

export default App;
