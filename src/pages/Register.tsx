import React from 'react';
import logo from '../assets/mote.png';
import userAvatar from '../assets/add-user.png';

const Register: React.FC = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src={logo} alt="Mote logo" />
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input className="inputForAvatar" type="file" id="avatar" />
          <label htmlFor="avatar">
            <img src={userAvatar} alt="Avatar input" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
