import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

// Components for different pages
import LoginWrapper from './components/LoginWrapper';
import Dashboard from './components/Dashboard';

function App() {
  const { isSignedIn } = useUser();

  return (
    <div className="app">
      <Routes>
        {/* Route for Login */}
        <Route
          path="/login"
          element={isSignedIn ? <Navigate to="/dashboard" replace /> : <LoginWrapper />}
        />
        
        {/* Default Route (Redirects based on sign-in status) */}
        <Route path="/" element={<Navigate to={isSignedIn ? "/dashboard" : "/login"} replace />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
