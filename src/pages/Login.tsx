import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/mote.png';
import SadPug from '../assets/sad_pug.webp';
import LoadingWrapper from '../components/LoadingWrapper';
import { auth } from '../config';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
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
        setError(errorMessage);
      });

    setLoading(false);
  };

  return (
    <LoadingWrapper loading={loading}>
      <div className="mobile-formContainer">
        <div className="sad">
          <img src={SadPug} alt="" />
        </div>
        <p>
          Sorry, we are currently working on our mobile version. For now you can only access the web version at{' '}
          {import.meta.env.VITE_APP_HOSTING_URL}
        </p>
      </div>
      <div className="formContainer">
        <div className="formWrapper">
          <img className="logo" src={logo} alt="Mote logo" />
          <span className="title">Login</span>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="error">{error && <p>{error}</p>}</div>

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
