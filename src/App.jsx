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

import SMSPModule1 from './pages/SMSP1/SMSPModule1';
import SkeletonSMSP2 from './pages/Skeleton--SMSP2';
import MM4 from './pages/MM4/MM4.jsx';
import DDP4 from './pages/DDP4/DDP4.jsx';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
          <Route path="/SMSPModule1" element={<SMSPModule1 />} />
          <Route path="/skeleton-smsp2" element={<SkeletonSMSP2 />} />
          <Route path="/MM4" element={<MM4 />} />
          <Route path="/DDP4" element={<DDP4 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
