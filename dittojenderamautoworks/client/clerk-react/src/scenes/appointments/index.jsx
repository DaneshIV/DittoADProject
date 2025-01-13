import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetAppointmentsQuery } from "../../state/api";
import { Header } from "../../components";

// Appointments
const Appointments = () => {
  // theme
  const theme = useTheme();
  // get data
  const { data, isLoading } = useGetAppointmentsQuery();

  // data columns
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "carType",
      headerName: "Car Type",
      flex: 1,
    },
    {
      field: "paintJob",
      headerName: "Paint Job",
      flex: 1,
    },
    {
      field: "additionalServices",
      headerName: "Additional Services",
      flex: 1,
      renderCell: (params) => (params.value.length > 0 ? params.value.join(", ") : "None"),
    },
    {
      field: "totalPrice",
      headerName: "Total Price (RM)",
      flex: 0.5,
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      flex: 0.5,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      flex: 0.5,
    },
    {
      field: "carNumberPlate",  
      headerName: "Car Number Plate",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="APPOINTMENTS" subtitle="Manage customer appointments." />

      {/* Content */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.tables.background,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: theme.palette.secondary.main,
          },
        }}
      >
        {/* Grid table */}
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Appointments;
