import { useContext, createContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import * as usersAPI from './api';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || "");
    const refreshTimeoutRef = useRef(null);   // to store the timeout ID for refreshing access token
    const navigate = useNavigate();

    // Function to refresh access token
    const refreshAccessToken = async () => {
        try {
            const response = await usersAPI.refresh();
            const newAccessToken = response.accessToken;
            console.log("New access token received:", newAccessToken);

            setToken(newAccessToken);   // runs useEffect hook to schedule a new refresh
            localStorage.setItem('site', newAccessToken);
        } catch (error) {
            console.error('Error refreshing access token:', error);
            logoutAction();   // if token refresh fails, fallback to logout
        }
    };

    // Function to schedule access token refresh 1 minute before expiration
    const scheduleRefresh = (token) => {

        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);   // 2. clear any existing/old timeout value
        
        const decodedAccessToken = jwtDecode(token);
        const expirationTime = decodedAccessToken.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;
        if (timeUntilExpiration > 0) {
            refreshTimeoutRef.current = setTimeout(   // 3. set a new timer
                refreshAccessToken,
                timeUntilExpiration - 60000   // trigger refresh 1 minute before expiration
            );
        }
    };
    
    // Whenever the token changes, schedule a refresh
    useEffect(() => {
        if (token) scheduleRefresh(token);   // 1. schedule refresh
    }, [token]);

    // Load user and progress state every time the component mounts
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        // console.log("User ID from localStorage:", userID);   // debugging line
        if (userID) {
            fetchUserAndProgress(userID);
        }
    }, []);

    // Handles the login event by calling the API, receiving the user data and token, and storing them locally in the browser
    const loginAction = async (payload) => {
        try {
            const res = await usersAPI.loginUser(payload);   // makes API call to server
            // console.log("Login response:", res);

            const prog = await usersAPI.fetchProgressByUserID(res.user._id)
            // console.log("Progress response:", prog);
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
    const updateProgress = async (id, { XP, modules }) => {
        try {
            const updatedProgress = await usersAPI.updateProgressByUserID(
                id,
                { XP, modules },
            );
            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }

    // Updates username
    const updateUsername = async (id, { username }) => {
        try {
            const updatedUser = await usersAPI.updateUsernameByID(
                id, 
                { username },   
            );
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    // Updates password
    const updatePassword = async (id, { password }) => {
        try {
            const updatedUser = await usersAPI.updatePasswordByID(
                id, 
                { password },   
            );
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
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
            const fetchedUser = await usersAPI.fetchUserByID(id);   // NOTE: this call may be redundant (since we already have the user ID in localStorage)
            setUser(fetchedUser);
            
            if (fetchedUser) {
                const fetchedProgress = await usersAPI.fetchProgressByUserID(fetchedUser._id);
                setProgress(fetchedProgress);
            }
            
            setToken(localStorage.getItem('site'));
            localStorage.setItem('userID', fetchedUser._id);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, progress, loginAction, logoutAction, updateProgress, updateUsername, updatePassword, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}
