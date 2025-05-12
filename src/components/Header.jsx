import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-blue-800 text-blue-100 py-10">
        <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold">What is my social media doing to me?</h1>
            <ul className="flex text-2xl space-x-4">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/grade-level" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Grade Level</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;