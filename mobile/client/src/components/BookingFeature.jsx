import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText, 
  Typography, 
  Paper, 
  Modal, 
  Box, 
  Rating 
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: 24,
  outline: 'none',
};

const BookingFeature = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedPaintJob, setSelectedPaintJob] = useState('');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [carNumberPlate, setCarNumberPlate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isReceiptUploaded, setIsReceiptUploaded] = useState(false);

  const priceList = [
    { name: "Mini A (Kancil, Viva, & DL)", paintJobs: { "Kansai Pro Clear": 1200, "Nippon High Solid": 1450, "Kansai High Shield Super Premium": 1650 } },
    { name: "Mini B (Myvi, ATOS, DLL)", paintJobs: { "Kansai Pro Clear": 1300, "Nippon High Solid": 1550, "Kansai High Shield Super Premium": 1750 } },
    { name: "Sedan A (Persona, Waja, & DL)", paintJobs: { "Kansai Pro Clear": 1500, "Nippon High Solid": 1750, "Kansai High Shield Super Premium": 1900 } },
    { name: "Sedan B (Mercedes, Camry & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 1950, "Kansai High Shield Super Premium": 2150 } },
    { name: "SUV A (Kembara, Ativa & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
    { name: "SUV B (Harrier & DL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } },
    { name: "MPV A (Alza, Avanza & DLL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
    { name: "MPV B (Vellfire, Alphard & DLL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } }
  ];

  const availableTimeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const getAvailableTimeSlots = (date) => {
    const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
    return isWeekend ? availableTimeSlots.filter(time => time !== "09:00") : availableTimeSlots;
  };

  const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
    updatePrice();
  };

  const handlePaintJobChange = (event) => {
    setSelectedPaintJob(event.target.value);
    updatePrice();
  };

  const handleAdditionalServicesChange = (event) => {
    setSelectedAdditionalServices(event.target.value);
    updatePrice();
  };

  const updatePrice = () => {
    const carType = priceList.find(item => item.name === selectedCarType);
    if (carType && selectedPaintJob) {
      const paintJobPrice = carType.paintJobs[selectedPaintJob];
      const additionalServiceCost = selectedAdditionalServices.length * 100;
      const total = paintJobPrice + additionalServiceCost;
      setTotalPrice(total);
    }
  };

  const handleBooking = async () => {
    if (!selectedCarType || !selectedPaintJob || !selectedDate || !selectedTime || !carNumberPlate) {
      alert("All fields are required!");
      return;
    }

    const bookingData = {
      carType: selectedCarType,
      paintJob: selectedPaintJob,
      additionalServices: selectedAdditionalServices,
      totalPrice,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      carNumberPlate
    };

    try {
      const response = await axios.post('http://localhost:5001/api/bookings', bookingData);
      setBookingStatus("Booking confirmed!");
      setPaymentModalOpen(true);
    } catch (error) {
      setBookingStatus("Failed to save booking. Please try again.");
      console.error("Error creating booking:", error);
    }
  };

  const printInvoice = () => {
    if (!selectedCarType || !selectedPaintJob) {
      alert("Please complete the booking details before printing the invoice.");
      return;
    }

    const invoiceData = {
      carType: selectedCarType,
      paintJob: selectedPaintJob,
      additionalServices: selectedAdditionalServices,
      totalPrice: new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(totalPrice),
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      carNumberPlate
    };

    const invoiceWindow = window.open('', 'Invoice', 'width=800,height=600');
    invoiceWindow.document.write(
      `<html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 20px;
              background-color: #f9f9f9;
            }
            h1 {
              text-align: center;
              color: #333;
            }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #ccc;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              background-color: #fff;
              border-radius: 10px;
            }
            .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-collapse: collapse;
            }
            .invoice-box table td {
              padding: 10px;
              vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
              text-align: right;
            }
            .invoice-box table tr.top {
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .invoice-box table tr.top td.title {
              font-size: 45px;
              line-height: 45px;
              color: #0056b3;
              font-weight: bold;
            }
            .invoice-box table tr.information {
              border-bottom: 2px solid #ddd;
              padding-bottom: 20px;
            }
            .invoice-box table tr.information td {
              padding-bottom: 10px;
            }
            .invoice-box table tr.heading {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
            .invoice-box table tr.details {
              padding-bottom: 20px;
            }
            .invoice-box table tr.item {
              border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last {
              border-bottom: none;
            }
            .invoice-box table tr.total {
              font-weight: bold;
              border-top: 2px solid #333;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <h1>Invoice</h1>
                      </td>
                      <td>
                        Date: ${new Date().toLocaleDateString()}<br />
                        Time: ${new Date().toLocaleTimeString()}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="information">
                <td colspan="2">
                  <table>
                    <tr>
                      <td>
                        Car Number Plate: ${invoiceData.carNumberPlate}<br />
                        Appointment Date: ${invoiceData.appointmentDate}<br />
                        Appointment Time: ${invoiceData.appointmentTime}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="heading">
                <td>Car Type</td>
                <td>${invoiceData.carType}</td>
              </tr>
              <tr class="heading">
                <td>Paint Job</td>
                <td>${invoiceData.paintJob}</td>
              </tr>
              <tr class="heading">
                <td>Additional Services</td>
                <td>${invoiceData.additionalServices.join(', ')}</td>
              </tr>
              <tr class="total">
                <td></td>
                <td>Total: ${invoiceData.totalPrice}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>`
    );
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  const handlePaymentModalClose = () => {
    if (isReceiptUploaded) {
      setPaymentModalOpen(false);
      setFeedbackModalOpen(true);
    } else {
      alert("Please upload your payment receipt first.");
    }
  };

  const handleReceiptUpload = (event) => {
    setReceipt(event.target.files[0]);
    setIsReceiptUploaded(true);
  };

  const handleFeedbackSubmit = () => {
    alert(`Thank you for your feedback! You rated us ${rating} stars.`);
    setFeedbackModalOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
        Car Painting Booking
      </Typography>

      {/* Car Type Select */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Car Type</InputLabel>
        <Select value={selectedCarType} onChange={handleCarTypeChange}>
          {priceList.map((car, index) => (
            <MenuItem key={index} value={car.name}>{car.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Paint Job Select */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Paint Job</InputLabel>
        <Select value={selectedPaintJob} onChange={handlePaintJobChange}>
          {selectedCarType && priceList.find(item => item.name === selectedCarType)?.paintJobs &&
            Object.keys(priceList.find(item => item.name === selectedCarType).paintJobs).map((paintJob, index) => (
              <MenuItem key={index} value={paintJob}>{paintJob}</MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Additional Services */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Additional Services</InputLabel>
        <Select
          multiple
          value={selectedAdditionalServices}
          onChange={handleAdditionalServicesChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {['Polish', 'Interior Cleaning', 'Engine Detailing'].map((service, index) => (
            <MenuItem key={index} value={service}>
              <Checkbox checked={selectedAdditionalServices.indexOf(service) > -1} />
              <ListItemText primary={service} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Booking Date and Time */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField
          label="Appointment Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Appointment Time"
          select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          fullWidth
          disabled={!selectedDate}
        >
          {selectedDate && getAvailableTimeSlots(selectedDate).map((time, index) => (
            <MenuItem key={index} value={time}>{time}</MenuItem>
          ))}
        </TextField>
      </div>

      {/* Car Number Plate */}
      <TextField
        label="Car Number Plate"
        value={carNumberPlate}
        onChange={(e) => setCarNumberPlate(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      {/* Total Price */}
      <Typography variant="h6" style={{ marginBottom: '20px' }}>
        Total Price: {totalPrice ? new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(totalPrice) : 'RM 0.00'}
      </Typography>

      {/* Confirm Booking Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
        Confirm Booking
      </Button>

      {/* Print Invoice Button */}
      <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '20px' }} onClick={printInvoice}>
        Print Invoice
      </Button>

      {/* Payment Modal */}
      <Modal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
        <Box style={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6">Upload Payment Receipt</Typography>
          <input type="file" onChange={handleReceiptUpload} />
          <div style={{ marginTop: '20px' }}>
            <Button onClick={handlePaymentModalClose} variant="contained">Upload Payment Receipt</Button>
          </div>
        </Box>
      </Modal>

      {/* Feedback Modal */}
      <Modal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)}>
        <Box style={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6">Feedback</Typography>
          <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
          <div style={{ marginTop: '20px' }}>
            <Button onClick={handleFeedbackSubmit} variant="contained">Submit Feedback</Button>
          </div>
        </Box>
      </Modal>
    </Paper>
  );
};

export default BookingFeature;
