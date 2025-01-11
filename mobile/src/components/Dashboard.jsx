import React from 'react';
import { UserButton } from '@clerk/clerk-react';

function Dashboard() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* User profile button on the top-right */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <UserButton />
      </div>

      <h1>Welcome to your Dashboard!</h1>
      <p>Here you can manage your account and view various settings.</p>
    </div>
  );
}

export default Dashboard;
