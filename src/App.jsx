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
import VerifyAccount from './features/users/VerifyAccount';
import SMSPModule1 from './pages/SMSP1/SMSPModule1';
import SkeletonSMSP2 from './pages/Skeleton--SMSP2';
import MM3 from './pages/MM3/MM3.jsx';
import DDP3 from './pages/DDP3/DDP3.jsx';
import SMSPModule3 from './pages/SMSPModule3';
import MM1 from './pages/MM1/MM1';
import MM2 from './pages/MM2/MM2';

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
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/destinations" element={<Destinations />} /> 
          <Route path="/SMSPModule1" element={<SMSPModule1 />} />
          <Route path="/skeleton-smsp2" element={<SkeletonSMSP2 />} />
          <Route path="/MM3" element={<MM3 />} />
          <Route path="/DDP3" element={<DDP3 />} />
          <Route path="/SMSPModule3" element={<SMSPModule3 />} />
          <Route path="/MM1" element={<MM1 />} />
          <Route path="/MM2" element={<MM2 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
