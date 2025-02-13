import React, { useState } from 'react';
import { Card, CardContent, Box, useTheme, FormControl, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wrapper } from '../../Style/Charts/Humidity';

// Humidity data for different time filters
const humidityData = {
  week: [
    { name: 'Low', value: 20, color: '#4CAF50' },
    { name: 'Medium', value: 50, color: '#FFC107' },
    { name: 'High', value: 30, color: '#F44336' },
  ],
  month: [
    { name: 'Low', value: 25, color: '#4CAF50' },
    { name: 'Medium', value: 45, color: '#FFC107' },
    { name: 'High', value: 30, color: '#F44336' },
  ],
  year: [
    { name: 'Low', value: 30, color: '#4CAF50' },
    { name: 'Medium', value: 40, color: '#FFC107' },
    { name: 'High', value: 30, color: '#F44336' },
  ],
};

export default function HumidityChart() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('year');
  const [chartData, setChartData] = useState(humidityData[selectedFilter]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    setChartData(humidityData[newFilter]);
  };

  return (
    <Wrapper>
      <Box className='box'>
        <Card sx={{ border: `0px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
          <CardContent>
            {/* Header with Filter Dropdown */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='header'>
              <h3 style={{ color: theme.palette.text.primary }}>Humidity</h3>
              <FormControl size="small">
                <Select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  // sx={{ backgroundColor: theme.palette.background.default }}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: 'none', // Remove border
                    '& fieldset': { border: 'none' }, // Remove default border from MUI
                  }}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Humidity Pie Chart */}
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  label={({ value }) => `${value}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span style={{ color: theme.palette.text.primary }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Wrapper>
  );
}
