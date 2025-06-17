/* This is the page for resetting a user's password. You can only access this page with a valid email link. */
/* This page should contain two password fields that must match, and a submit button for resetting the password.
   It should first parse the token from the user's email link to verify the user is authorized to reset the password. 
*/

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // First check for matching passwords before allowing form submission
    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userID = decodedToken.id;

    try {
      const response = await axios.put('http://localhost:5000/api/auth/reset-password', {
        userID,
        password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // if (response.status === 200)
      setPassword('');
      setConfirmPassword('');
      setError(null);
      alert('Password successfully reset! You will be redirected to the login page shortly.');
      setTimeout(() => { navigate('/user-forms'); }, 3000);
    } catch (error) {
      setError('Failed to reset password.');
      console.error('Error resetting password:', error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {token ? (
            <>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setPassword(e.target.value)}
                />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
              {!passwordsMatch && confirmPassword !== '' && <p className="text-red-500">Passwords do not match</p>}
              {error && <p className="text-red-500">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </>
          ) : (
            <>
              < p className="text-red-500">You are not authorized to reset this password.</p>
            </>
          )}
        </form>
      </div>
  );
};

export default ResetPassword;
