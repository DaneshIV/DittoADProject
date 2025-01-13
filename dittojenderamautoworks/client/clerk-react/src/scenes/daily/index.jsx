import React, { useMemo, useState } from "react";
import { Box, Typography, useTheme, TextField } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; 

import { useGetSalesQuery } from "../../state/api";
import { Header } from "../../components";

// Daily
const Daily = () => {
  // keep track of start & end date
  const [startDate, setStartDate] = useState(dayjs("2021-02-01"));
  const [endDate, setEndDate] = useState(dayjs("2021-03-01"));

  // get data
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  // format data
  const formattedData = useMemo(() => {
    if (!data) return [];

    // daily data
    const { dailyData } = data;

    // total sales line
    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.tables.lines,
      data: [],
    };

    // total units line
    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.tables.anotherLine,
      data: [],
    };

    // factor daily data
    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      // formatted date
      const dateFormatted = dayjs(date);

      if (dateFormatted.isAfter(startDate) && dateFormatted.isBefore(endDate)) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data.push({
            x: splitDate,
            y: totalSales,
        });

        totalUnitsLine.data.push({
            x: splitDate,
            y: totalUnits,
        });
      }
    });

    //const formattedData = [totalSalesLine, totalUnitsLine];

    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate, theme.palette.tables]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />

      {/* Content */}
      {data ? (
        <Box height="75vh">
          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" justifyContent="flex-end">
              {/* Start Date */}
              <Box mr={2}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                    {...params}
                    InputLabelProps={{
                      style: { color: theme.palette.tables.picker }, // Label color
                    }}
                    InputProps={{
                      style: {
                        color: theme.palette.tables.picker, // Text color
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.tables.picker, // Default border
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.tables.picker, // Hover border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.tables.picker, // Focused border
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* End Date */}
              <Box>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}  // Update state properly
                  minDate={startDate}  // Ensure endDate can't be before startDate
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        style: { color: theme.palette.primary.main }, // Label color
                      }}
                      InputProps={{
                        style: {
                          color: theme.palette.secondary.main, // Text color
                          borderColor: theme.palette.primary.main, // Border color
                        },
                      }}
                      sx={{
                        ".MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: `${theme.palette.tables.picker} !important`, // Default border
                          },
                          "&:hover fieldset": {
                            borderColor: `${theme.palette.tables.picker} !important`, // Hover border
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: `${theme.palette.tables.picker} !important`, // Focused border
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          {/* Line Chart */}
          <ResponsiveLine
            data={formattedData}
            colors={({ id }) => {
              // Map each line id to a theme color
              if (id === "Total Sales") return theme.palette.tables.lines;
              if (id === "Total Units") return theme.palette.tables.anotherLine;
              return "#000"; // Fallback color
            }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary.main,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary.main,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary.main,
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary.main,
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary.main,
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            //colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      ) : (
        // Loader
        <Typography variant="h5" mt="20%" textAlign="center">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Daily;
