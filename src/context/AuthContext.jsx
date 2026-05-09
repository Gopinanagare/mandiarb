import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [unlockedOpps, setUnlockedOpps] = useState([]); // Array of opp IDs

  const login = (userData) => {
    setUser(userData);
    // In a real app, you would check subscription status from backend
  };

  const logout = () => {
    setUser(null);
    setIsSubscribed(false);
  };

  const subscribe = () => {
    setIsSubscribed(true);
  };

  const unlockOpp = (id) => {
    if (!unlockedOpps.includes(id)) {
      setUnlockedOpps([...unlockedOpps, id]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isSubscribed, unlockedOpps, login, logout, subscribe, unlockOpp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
