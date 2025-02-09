import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, useTheme } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

import FlexBetween from "./FlexBetween";

// Data Grid toolbar
const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const theme = useTheme();

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        {/* Left Side */}
        <FlexBetween>
          <GridToolbarColumnsButton 
            sx={{ color: theme.palette.secondary.alt,
                  '&:hover': { color: theme.palette.secondary.light },
             }}
          />
          <GridToolbarDensitySelector 
            sx={{ color: theme.palette.secondary.alt,
                  '&:hover': { color: theme.palette.secondary.light },
             }}
          />
          <GridToolbarExport 
            sx={{ color: theme.palette.secondary.alt,
              '&:hover': { color: theme.palette.secondary.light },  
             }}
          />
        </FlexBetween>

        {/* Right Side (search) */}
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
