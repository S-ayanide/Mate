import React, { createContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config';

interface IAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as { currentUser: User | null });

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
