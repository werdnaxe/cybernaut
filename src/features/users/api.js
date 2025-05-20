import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// POST (create) user when button is clicked
export const createUser = async ({ username, email, password }) => {
    const { data } = await axios.post(API_URL, { username, email, password });
    return data;   // server response?
};

// GET (fetch) user by ID
export const fetchUserByID = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;   // payload : { username, email, password }?
};

// GET (fetch) all users
export const fetchAllUsers = async () => {
    const { data } = await axios.get(API_URL);
    return data;   // payload : [{ username, email, password }, ...]
};

// PUT (update) user by ID
export const updateUserByID = async (id, { username, email, password }) => {
    const { data } = await axios.put(`${API_URL}/${id}`, { username, email, password });
    return data;   // server response?
}

// DELETE user by ID
export const deleteUserByID = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;   // server response?
}
