import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersAPI from './api';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || "");
    const navigate = useNavigate();

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
                setUser(res);
                setProgress(prog);
                setToken(res.token);
                localStorage.setItem('site', res.token);
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
        localStorage.removeItem('site');
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}
