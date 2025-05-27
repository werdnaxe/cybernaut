import { useContext, createContext, useState, use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersAPI from './api';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || "");
    const navigate = useNavigate();

    // Load user and progress state every time the component mounts
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log("User ID from localStorage:", userID);   // debugging line
        if (userID) {
            fetchUserAndProgress(userID);
        }
    }, []);

    // Handles the login event by calling the API, receiving the user data and token, and storing them locally in the browser
    const loginAction = async (payload) => {
        try {
            const res = await usersAPI.loginUser(payload);   // makes API call to server
            console.log("Login response:", res);

            const prog = await usersAPI.fetchProgressByUserID(res.user._id)
            console.log("Progress response:", prog);
            if (!prog) {
                throw new error('Failed to retrieve progress document');
            }

            if (res) {
                setUser(res.user);
                setProgress(prog);
                setToken(res.token);
                localStorage.setItem('site', res.token);   // store token in localStorage
                localStorage.setItem('userID', res.user._id);   // store user ID in localStorage
                navigate("/dashboard");
                return;
            }

        } catch (error) {
            throw error;
        }
    };

    // Handles the logout event
    const logoutAction = () => {
        setUser(null);
        setToken(null);
        setProgress(null);
        localStorage.removeItem('userID');
        localStorage.removeItem('site');
        navigate("/");
    }

    // Updates user's progress document locally and in database
    const updateProgress = async (userID, { XP, submodulePerModule }) => {
        try {
            const updatedProgress = await usersAPI.updateProgressByUserID(userID, { XP, submodulePerModule });
            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }

    // Updates user's account information
    const updateUser = async (id, { username, email, password }) => {
        try {
            const updatedUser = await usersAPI.updateUserByID(id, { username, email, password });
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Deletes user account
    const deleteUser = async (id) => {
        try {
            await usersAPI.deleteUserByID(id);
            setUser(null);
            setProgress(null);
            setToken(null);
            localStorage.removeItem('userID');
            localStorage.removeItem('site');
            navigate("/");
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Ensures user persists across page reloads
    const fetchUserAndProgress = async (id) => {
        try {
            const fetchedUser = await usersAPI.fetchUserByID(id);
            setUser(fetchedUser);
            const fetchedProgress = await usersAPI.fetchProgressByUserID(fetchedUser._id);
            setProgress(fetchedProgress);
            setToken(localStorage.getItem('site'));
            localStorage.setItem('userID', fetchedUser._id);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, progress, loginAction, logoutAction, updateProgress, updateUser, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}
