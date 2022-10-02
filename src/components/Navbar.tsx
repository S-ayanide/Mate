import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mote.png';
import { auth } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useLocalStorage('user');

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
