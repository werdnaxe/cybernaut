import { useState, useEffect, useCallback } from 'react';
import * as usersAPI from './api';

export function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    usersAPI.fetchUserByID(id)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);
  
  return { user, loading };
}

// Create a new user separately from useUser()
export function useCreateUser() {
  const createUser = useCallback(async (payload) => {
    const newUser = await usersAPI.createUser(payload);
    return newUser;
  }, [])

  return { createUser };
}
