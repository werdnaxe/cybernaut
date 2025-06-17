/* This is the SignupForm component. It will allow someone to create a user. */

import { useState } from 'react'
import { useCreateUser } from './hooks'
import axios from 'axios';

export default function SignupForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { createUser } = useCreateUser();
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(() => localStorage.getItem('signup_success') === 'true');
  const [signupEmail, setSignupEmail] = useState(() => localStorage.getItem('signup_email') || '');

  const handleChange = (e) => {
    setForm(form => ({...form, [e.target.name]: e.target.value}));
    setError(null);
  };

  // Handles form submission and begins the process of creating a new user and progress document
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      alert('User created! Please check your email to verify your account.');

      // Update success state here to unlock 'Resend Link' button
      setSuccess(true);
      setSignupEmail(form.email);
      localStorage.setItem('signup_success', 'true');   // remember success state across page reloads
      localStorage.setItem('signup_email', form.email);   // remember email across page reloads

      setForm({ 
        username: '',
        email: '',
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
      <h1 className = "text-2xl mb-4">Create a New User</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username" value={form.username} onChange={handleChange}
            placeholder="Username" required
            className="w-full border px-3 py-2 rounded" />
          <input
            name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="Email" required
            className="w-full border px-3 py-2 rounded" />
          <input
            name="password" type="password" value={form.password} onChange={handleChange}
            placeholder="Password" required
            className="w-full border px-3 py-2 rounded" />
          <button type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded">
            Create User
          </button>
        </form>

          {/* Show 'Resend Link' button only if user was successfully created. Clicking on it will make another call to /auth/verify-account. Currently, this link only disappears when user verifies account. */}
          {success && (
            <button 
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              type="submit"
              onClick={async () => {
                try {
                  await axios.post('http://localhost:5000/api/auth/verify-account', { email: signupEmail });
                  alert('Verification email resent! Please check your inbox.');
                } catch (error) {
                  console.error('Error resending verification link:', error);
                }
              }}>
              Resend Link
            </button>
          )}
    </div>
  )
}
