import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import logo from '/public/JAAS_CLEAR.png';
import { UserButton } from "@clerk/clerk-react";

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory === 'ALL' || car.category === selectedCategory;
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase()) || car.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>     
      <AppBar position="static" color="default">
        <Toolbar>
        <img src={logo} alt="Logo" style={{ height: '45px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <UserButton />
        </Toolbar>
      </AppBar>

      <Box sx={{ margin: '20px'}}>
        <Typography variant="h6" sx={{ color: '#bd212f', fontWeight: 'bold' }}>
          Welcome to Jenderam Autoworks!
        </Typography>
      </Box>

      <TextField
        id="input-with-icon-textfield"
        variant="filled"
        value={searchQuery}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{paddingBottom: '12px'}}/>
              </InputAdornment>
            ),
            disableUnderline: true,
          },
        }}
        sx={{
          width: '90%',
          backgroundColor: '#ebe4e4',
          borderRadius: '50px',
          '& .MuiFilledInput-root': {
            borderRadius: '50px',
            padding: '0px 0px 0px 12px', // Adjust padding here
            '& .MuiInputAdornment-root': {
              marginRight: '8px', // Adjust padding for the adornment
              display: 'flex',
              alignItems: 'center', // Center the icon vertically
            },
            '& input': {
              padding: '5px 0', // Adjust padding for the input text
            },
          },
        }}
      />

      {/* Dynamic Tabs */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2}}>
    
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#ffffff' },  // Indicator color
          }}
        >
          <Tab label="ALL" value="ALL" 
            sx={{
              fontWeight: 'bold',
              backgroundColor: selectedCategory === 'ALL' ? '#bd212f' : 'inherit',
              color: selectedCategory === 'ALL' ? '#ffffff' : 'inherit',
            }}/>
            {Array.from(new Set(cars.map((car) => car.category.trim()))).map((category, index) => (
            <Tab key={index} label={category.toUpperCase()} value={category} 
              sx={{
                fontWeight: 'bold',
                backgroundColor: selectedCategory === category ? '#bd212f' : 'inherit',
                color: selectedCategory === category ? '#ffffff' : 'inherit',
              }}/>
          ))}
        </Tabs>
     
      </Box>

      {/* Car Cards */}
      <Box sx={{ padding: 2 }}>
        {filteredCars.map((car, index) => (
          <Card key={index} sx={{ marginBottom: 2, borderRadius: '10px' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="h6" textAlign={"left"} sx={{marginLeft:'16px', marginTop:'10px'}} >{car.title}</Typography>
              
              <CardMedia
                component="img"
                height="200"
                image={car.image}
                alt={car.title}
                style={{ height: '200px', objectFit: 'contain', backgroundColor: '#ebe4e4', marginTop:'10px', marginBottom:'20px' }}
              />

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
                onClick={handleBookAppointment}
                //fullWidth
                sx={{ 
                  marginTop: 2,
                  backgroundColor: '#bd212f', // Custom color
                  borderRadius: '50px',      // Makes the button oval-shaped
                  paddingX: 1,               // Optional: Adds horizontal padding for better shape
                  paddingY: 1,  
                  width: '70%',
                }}
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
