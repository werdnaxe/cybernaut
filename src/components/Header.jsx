import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../features/users/AuthProvider';

const Header = () => {
  const { user, logoutAction } = useAuthContext();

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
                
                {/* Display username and logout button upon user login */}
                {user && (
                    <li>
                        <span className="text-yellow-200 mr-4">{user.username}</span>
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
