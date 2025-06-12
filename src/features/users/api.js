/* This file contains API wrapper functions for hitting our API endpoints. */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// POST (create) user when button is clicked
export const createUser = async ({ username, email, password }) => {
    
    // First, create the account in the database if it doesn't already exist
    const { data } = await axios.post(`${API_URL}/users`, { username, email, password });

    // Then, send a verification email to the user
    await axios.post(`${API_URL}/auth/verify-account`, { email });
    
    return data;
};

// POST (create) progress doc when new user is created
export const createProgress = async ({ user, modules }) => {
    const { data } = await axios.post(`${API_URL}/progress`, { user, modules });
    return data;
};

// POST (login) user when button is clicked
export const loginUser = async ({ username, password }) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, 
        { username, password },
        {
            withCredentials: true,
        }
    );
    return data;
};

// GET (fetch) user by ID
export const fetchUserByID = async (id) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.get(`${API_URL}/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// GET (fetch) progress doc by user ID
export const fetchProgressByUserID = async (userID) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.get(`${API_URL}/progress/${userID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// PUT (update) username by ID
export const updateUsernameByID = async (id, { username }) => {
    const token = localStorage.getItem('site');
    try {
        const { data } = await axios.put(`${API_URL}/users/${id}/username`, { username }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error updating username');
    }
};

// PUT (update) password by ID
export const updatePasswordByID = async (id, { password }) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.put(`${API_URL}/users/${id}/password`, { password }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// PUT (update) progress doc by user ID
export const updateProgressByUserID = async (userID, { XP, modules }) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.put(`${API_URL}/progress/${userID}`, { XP, modules },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// DELETE user by ID
export const deleteUserByID = async (id) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.delete(`${API_URL}/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// DELETE progress doc by user ID
export const deleteProgressByUserID = async (userID) => {
    const token = localStorage.getItem('site');
    const { data } = await axios.delete(`${API_URL}/progress/${userID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};

// TO-DO: implement logout functionality

// TO-DO: implement refresh token functionality
export const refresh = async () => {
    const { data } = await axios.post(`${API_URL}/auth/refresh`, 
        {},
        {
            withCredentials: true,   // includes cookies in the request
        }
    );
    console.log('Refresh token response:', data);
    return data;
}
