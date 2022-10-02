// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const user = localStorage.getItem(key);
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return { currentUser };
};
