import React from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function App() {

  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    // If not signed in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a simple React app using Vite.</p>
    </div>
  );
}

export default App;




