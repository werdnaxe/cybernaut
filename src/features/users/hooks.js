import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { useAuthContext } from './AuthProvider';
import * as usersAPI from './api';

// Allow a user to login
export function useLoginUser() {
  const { loginAction } = useAuthContext();

  const loginUser = async (payload) => {
    try {
      await loginAction(payload);   // calls loginAction from AuthProvider
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { loginUser };
}

// ?
export function useLoadUser(id) {
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

// Create a new user and progress doc
export function useCreateUser() {
  const createUser = useCallback(async (payload) => {
    const newUser = await usersAPI.createUser(payload);
    const newProgress = await usersAPI.createProgress({ userID: newUser._id });

    if (!newProgress) {
      throw new Error('Failed to create progress document');
    }

  }, [])

  return { createUser };
}
