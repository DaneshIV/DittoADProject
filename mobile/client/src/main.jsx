import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './app';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk publishable key to the .env.local file');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    {/* Wrap App in BrowserRouter for routing context */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
