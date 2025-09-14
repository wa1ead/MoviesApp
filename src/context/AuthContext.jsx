import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    try {
      const userWithTimestamp = {
        ...userData,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userWithTimestamp));
      setUser(userWithTimestamp);
      setIsLoggedIn(true);
      toast.success("Successfully logged in!", { icon: "👋" });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const register = (userData) => {
    try {
      const userWithTimestamp = {
        ...userData,
        loginTime: new Date().toISOString(),
        registrationTime: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userWithTimestamp));
      setUser(userWithTimestamp);
      setIsLoggedIn(true);
      toast.success("Account created successfully!", { icon: "🎉" });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
      toast.success("Logged out successfully!", { icon: "👋" });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const updateUser = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully!", { icon: "✅" });
      return true;
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("Failed to update profile. Please try again.");
      return false;
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Default export should be the context
export default AuthContext;
