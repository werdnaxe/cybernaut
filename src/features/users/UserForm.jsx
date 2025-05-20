/* This is the UserForm component. It will allow someone to create a user. */

import React, { use, useState } from 'react'
import { useCreateUser } from './hooks'

export default function UserForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { createUser } = useCreateUser();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(f => ({...f, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      alert('User created!');
      setForm({ 
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className = "text-2xl mb-4">Create a New User</h1>
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          name="username" value={form.name} onChange={handleChange}
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
    </div>
  )
}
