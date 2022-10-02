import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import logo from '../assets/mote.png';
import { auth } from '../config';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Mote logo" />
      <div className="user">
        <img src={currentUser?.photoURL as string} alt={currentUser?.displayName as string} />
        <span>{currentUser?.displayName?.split(' ')[0] as string}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
