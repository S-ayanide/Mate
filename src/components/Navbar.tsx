import React from 'react';
import logo from '../assets/mote.png';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Mote logo" />
      <div className="user">
        <img src="" alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
