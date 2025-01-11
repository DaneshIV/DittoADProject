// Dashboard.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {/* Other Dashboard Content */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBookAppointment}
        style={{ marginTop: '20px' }}
      >
        Book an Appointment
      </Button>
    </div>
  );
}

export default Dashboard;
