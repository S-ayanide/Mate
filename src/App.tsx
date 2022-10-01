import React, { useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './styles.scss';

const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  // Protected Routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  console.log(currentUser);

  return (
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
  );
};

export default App;
