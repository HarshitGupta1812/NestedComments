import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Create a pre-configured axios instance that knows our backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This effect runs when the app starts to check if a user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Set the auth token for all future API requests
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }
    setLoading(false);
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  // Function to handle new user registration
  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    // After a successful sign-up, immediately log the new user in
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  // Provide the user state and functions to all child components
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default api;

// Export the pre-configured axios instance for use in