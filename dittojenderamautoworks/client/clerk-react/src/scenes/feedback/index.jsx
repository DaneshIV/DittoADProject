import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetFeedbackQuery } from "../../state/api";
import { Header } from "../../components";

// Feedback
const Feedback = () => {
  // theme
  const theme = useTheme();
  // get data
  const { data, isLoading } = useGetFeedbackQuery();

  // data columns
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer Name",
      flex: 0.5,
      valueGetter: (params) => params.row.customerId?.name || "N/A", // Safely handle null data
    },
    {
      field: "productId",
      headerName: "Product Name",
      flex: 0.5,
      valueGetter: (params) => params.row.productId?.name || "N/A",
    },
    {
      field: "feedbackText",
      headerName: "Feedback",
      flex: 1.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
    },
    {
      field: "submissionDate",
      headerName: "Submission Date",
      flex: 0.8,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(), // Format date
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="FEEDBACK" subtitle="See your list of customer feedback." />

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
            //color: theme.palette.secondary[100],
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
          "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
            color: `${theme.palette.secondary[200]} !important`,
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

export default Feedback;
