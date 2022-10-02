import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/mote.png';
import LoadingWrapper from '../components/LoadingWrapper';
import { auth } from '../config';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // TODO: Create a toaster to handle error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // TODO: Add a loader while user is registering

    e.preventDefault();
    const email = Object.values(e.target)[0].value;
    const password = Object.values(e.target)[1].value;

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });

    setLoading(false);
  };

  return (
    <LoadingWrapper loading={loading}>
      <div className="formContainer">
        <div className="formWrapper">
          <img className="logo" src={logo} alt="Mote logo" />
          <span className="title">Login</span>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Sign In</button>
          </form>
          <p>
            Don&apos;t have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Login;
