import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../features/users/AuthProvider';

const Header = () => {
  const { user, progress, logoutAction } = useAuthContext();

  if (user && !progress) {
    return (
        <div>
            Loading...
        </div>
    )
  };

  return (
    <header className="font-zing bg-blue-800 text-blue-100 py-5 pl-10 pr-10">
        <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold font-zing">What is my social media doing to me?</h1>
            <ul className="flex text-2xl space-x-4">
                <li className="font-zing">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Home</NavLink>
                </li>
                <li className="font-zing">
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>About</NavLink>
                </li>
                <li className="font-zing">
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Contact</NavLink>
                </li>
                
                <li>
                    <NavLink to="/destinations" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Destinations</NavLink>
                </li>
                

                {/* Display user forms only if user is not logged in */}
                {!user && (
                    <li>
                        <NavLink to="/user-forms" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Signup/Login</NavLink>
                    </li>
                )}

                {/* Display Profile and Dashboard only upon user login */}
                {user && (
                    <>
                        <li>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'font-bold text-yellow-200' : 'hover:text-gray-300'}>Dashboard</NavLink>
                        </li>
                    </>
                )}
                
                {/* Display username, XP/level, and logout button upon user login */}
                {user && (
                    <li className="flex items-center space-x-4">
                        <div className="flex flex-col">
                            <span className="text-yellow-200 mr-4">Hi, {user.username}</span>
                            <span className="text-yellow-200 mr-4">Level: {progress.XP / 100}</span>
                        </div>
                        <button onClick={logoutAction} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    </header>
  );
};

export default Header;
