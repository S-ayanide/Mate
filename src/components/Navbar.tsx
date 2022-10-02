// eslint-disable-next-line import/named
import { signOut, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mote.png';
import { auth } from '../config';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [currentUser]);

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Mote logo" />
      <div className="user">
        <img src={currentUser?.photoURL as string} alt={currentUser?.displayName as string} />
        <span>{currentUser?.displayName?.split(' ')[0] as string}</span>
        <button
          onClick={() => {
            signOut(auth);
            localStorage.removeItem('user');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
