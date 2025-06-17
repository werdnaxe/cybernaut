/* This is the LoginForm component. It will allow a user to login to their account. */

import React, { useState } from 'react'
import { useLoginUser } from './hooks'
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({
        username: '',
        password: ''
  });
  const { loginUser } = useLoginUser();
  const [error, setError] = useState(null);
  const [showRecoveryOptions, setShowRecoveryOptions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(form => ({...form, [e.target.name]: e.target.value}));
    setError(null);   // clears error on input change (when user starts typing again)
  };

  // Handles user form input and submission
  // Provide a "Need help logging in?" link that provides a link to reset username or password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(form);   // calls loginUser from useLoginUser hook
      setError(null);
      alert('Login successful!');
      setForm({ 
        username: '',
        password: ''
      });
      setError(null);
    } catch (error) {
      // Display server's error message if available
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className = "text-2xl mb-4">User Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!showRecoveryOptions ? (
            <>
              <input
                name="username" value={form.username} onChange={handleChange}
                placeholder="Username" required
                className="w-full border px-3 py-2 rounded" />
              <input
                name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="Password" required
                className="w-full border px-3 py-2 rounded" />
              <button type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded">
                Login
              </button>

              {/* The below link redirects the user to the Profile Recovery page */}
              <button
                type="button"   // should prevent form submission
                onClick={() => setShowRecoveryOptions(true)}
                className="text-blue-600 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer">
                Need help logging in?
              </button>
            </>
          ) : (
            <>
              {/* Login Help link was clicked, triggering the below profile recovery options */}
              <button
                type="button"   // should prevent form submission
                onClick={() => navigate('/profile-recovery?option=username')}
                className="w-full mb-2 text-left text-blue-600 hover:underline">
                Recover Username
              </button>
              <button
                type="button"   // should prevent form submission
                onClick={() => navigate('/profile-recovery?option=password')}
                className="w-full mb-2 text-left text-blue-600 hover:underline">
                Reset Password
              </button>
            </>
          )}
        </form>
    </div>
  );
};
