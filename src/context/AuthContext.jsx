import { createContext, useContext, useEffect, useState } from "react";
import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../services/authService";

const UserContext = createContext(null);

export const UserAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserAuth must be used within AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSessionUser());
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const sessionUser = await loginUser(email, password);
    setUser(sessionUser);
    return sessionUser;
  };

  const signup = async (formData) => {
    const sessionUser = await registerUser(formData);
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    if (!user?.id) {
      throw new Error("You must be logged in to update your profile.");
    }
    const updatedUser = await updateUserProfile(user.id, updates);
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedOut: !user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
