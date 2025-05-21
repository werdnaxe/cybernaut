// /* This is the LoginForm component. It will allow a user to login to their account. */

import React, { useState } from 'react'
import { useLoginUser } from './hooks'

export default function LoginForm() {
  const [form, setForm] = useState({
        username: '',
        password: ''
  });
  const { loginUser } = useLoginUser();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(f => ({...f, [e.target.name]: e.target.value}));
    setError(null);   // clears error on input change (when user starts typing again)
  };

  // NOTE: need to make this function mesh with AuthProvider
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(form);
      setError(null);
      alert('Login successful!');
      // Look into redirecting user here
      setForm({ 
        username: '',
        password: ''
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className = "text-2xl mb-4">User Login</h1>
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          name="username" value={form.name} onChange={handleChange}
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
        </form>
    </div>
  )

}
