import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const cars = [
    {
      category: 'MINI',
      title: 'MINI',
      image: '/CategoryA-MINI.png', // Replace with actual image URL
      description: 'Category A\nKancil, Viva & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'MINI',
      title: 'MINI',
      image: '/CategoryB-MINI.png', // Replace with actual image URL
      description: 'Category B\nMyvi, Atos & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'SEDAN',
      title: 'SEDAN',
      image: '/CategoryA-SEDAN.png', // Replace with actual image URL
      description: 'Category A\nPersona, Waja & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'SEDAN',
      title: 'SEDAN',
      image: '/CategoryB-SEDAN.png', // Replace with actual image URL
      description: 'Category B\nMercedes, Camry & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'SUV',
      title: 'SUV',
      image: '/CategoryA-SUV.png', // Replace with actual image URL
      description: 'Category A\nKembara, Ativa & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'SUV',
      title: 'SUV',
      image: '/CategoryB-SUV.png', // Replace with actual image URL
      description: 'Category B\nHarrier & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'MPV',
      title: 'MPV',
      image: '/CategoryA-MPV.png', // Replace with actual image URL
      description: 'Category A\nAlza, Avanza & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
    {
      category: 'MPV',
      title: 'MPV',
      image: '/CategoryB-MPV.png', // Replace with actual image URL
      description: 'Category B\nVellfire, Alphard & DLL',
      prices: [
        { name: 'Kansai Pro Clear', price: 'RM 1500' },
        { name: 'Nippon High Solid', price: 'RM 1750' },
        { name: 'Kansai High Solid Super Premium', price: 'RM 1950' },
      ],
    },
  ];

  const filteredCars = selectedCategory === 'ALL'
    ? cars
    : cars.filter((car) => car.category === selectedCategory);

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Dynamic Tabs */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="ALL" value="ALL" />
          {Array.from(new Set(cars.map((car) => car.category.trim()))).map((category, index) => (
            <Tab key={index} label={category.toUpperCase()} value={category} />
          ))}
        </Tabs>
      </Box>

      {/* Car Cards */}
      <Box sx={{ padding: 2 }}>
        {filteredCars.map((car, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={car.image}
              alt={car.title}
              style={{ height: '200px', objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="h6">{car.title}</Typography>
              <Typography variant="body2" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
                {car.description}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                {car.prices.map((price, idx) => (
                  <Typography key={idx} variant="body2">
                    {price.name}: <strong>{price.price}</strong>
                  </Typography>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBookAppointment}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Book an Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Dashboard;
