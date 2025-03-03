// authContainer.js - Provides authentication context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hub } from 'aws-amplify';
import { signOut } from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signIn':
          setUser(payload.data);
          break;
        case 'signOut':
          setUser(null);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);