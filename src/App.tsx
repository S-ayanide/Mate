import { onAuthStateChanged } from 'firebase/auth';
import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './config';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useStoreActions } from './store';
import './styles.scss';

const App: React.FC = () => {
  const setCurrentUser = useStoreActions((actions) => actions.setCurrentUser);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      }
    });
  }, []);

  // Protected Routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    if (typeof localStorage['user'] === 'undefined') {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <div className="root">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
