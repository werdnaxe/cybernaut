import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// POST (create) user when button is clicked
export const createUser = async ({ username, email, password }) => {
    const { data } = await axios.post(`${API_URL}/users`, { username, email, password });
    return data;
};

// POST (create) progress doc when new user is created
export const createProgress = async ({ userID }) => {
    const { data } = await axios.post(`${API_URL}/progress`, { userID });
    return data;
}

// POST (login) user when button is clicked
export const loginUser = async ({ username, password }) => {
    const { data } = await axios.post(`${API_URL}/users/login`, { username, password });

    // Check if login credentials are valid
    if (data === 'Invalid username or password') {
        throw new Error('Invalid username or password');
    }

    // If valid, return user data
    return data;
}

// GET (fetch) user by ID
export const fetchUserByID = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
};

// GET (fetch) progress doc by user ID
export const fetchProgressByUserID = async (userID) => {
    const { data } = await axios.get(`${API_URL}/progress/${userID}`);
    return data;
}

// GET (fetch) all users
export const fetchAllUsers = async () => {
    const { data } = await axios.get(API_URL);
    return data;
};

// PUT (update) user by ID
export const updateUserByID = async (id, { username, email, password }) => {
    const { data } = await axios.put(`${API_URL}/${id}`, { username, email, password });
    return data;
}

// DELETE user by ID
export const deleteUserByID = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
}
