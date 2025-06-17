/* This page will allow a user to reset their username or password if they forgot either of them and are locked out of their account. */
/* Flow:
    1. User enters email in email entry box
    2. User clicks Submit (or analagous) button
    3. '/login-help' endpoint is reached and link is sent to user's email with further instructions, depending on previous recovery option choice user made (uname of pass?)
*/

import { React, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

const ProfileRecovery = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: '' });
  const option = searchParams.get('option');   // will parse either 'username' or 'password' from URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle button submission function here
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = form.email;

      // If the option is 'username', email should be sent to user containing their username.
      // If the option is 'password', email should be sent to user containing a link to reset their password.
      const response = await axios.post(`http://localhost:5000/api/auth/login-help?option=${option}`, { email });
      setForm({ email: '' });
      if (response.status === 200) {
        alert(`An email has been sent to ${email} with further instructions to recover your account.`);
      } else {
        alert('There was an error processing your request. Please try again later.');
      }
    } catch (error) {
      console.error('Error recovering profile:', error);
    }
  }

  return (
    <div className="mt-10 text-center">
      {option === 'username' ? (
        <h1
          className="text-2xl mb-4">
          Recover your Username 
        </h1>
      ) : (
        <h1
          className="text-2xl mb-4">
          Reset your password
        </h1>
      )}

      {/* The below recovery form will be used for both username and password recovery */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <input
          type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileRecovery;
