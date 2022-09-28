import React from 'react';
import logo from '../assets/mote.png';

const Login: React.FC = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src={logo} alt="Mote logo" />
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Sign In</button>
        </form>
        <p>Don&apos;t have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
