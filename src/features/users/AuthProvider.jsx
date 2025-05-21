import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/users';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            console.log("Login response:", res);
            if (res.data) {
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem('site', res.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        } catch (error) {
            console.error(error);
        }
    };

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
