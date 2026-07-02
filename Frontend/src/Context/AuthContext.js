import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark-purple";
    });
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/auth/me",
                { withCredentials: true }
            );

            setUser(response.data.user);
            setIsAuthenticated(true);
            setUserId(response.data.user._id);
        }
        catch (err) {
            setUser(null);
            setIsAuthenticated(false);
            setUserId(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await fetchUser();
            }
            finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                userId,
                setUserId,
                loading,
                user,
                setUser,
                theme,
                setTheme,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};