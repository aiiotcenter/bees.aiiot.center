import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, useTheme, FormControl, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wrapper } from '../../Style/Charts/Humidity';

export default function HumidityChart() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('year');
  const [chartData, setChartData] = useState([]);

  // Fetch humidity data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://bees-backend.aiiot.center/api/data');
      const data = await response.json();

      // Filter data based on the selected time range
      const filteredData = filterDataByTime(data, selectedFilter);

      // Process the humidity levels into categories
      const humidityLevels = categorizeHumidity(filteredData);

      setChartData(humidityLevels);
    } catch (error) {
      console.error('Error fetching humidity data:', error);
    }
  };

  // Fetch data on mount & when filter changes
  useEffect(() => {
    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [selectedFilter]);

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Function to filter data based on time range
  const filterDataByTime = (data, filter) => {
    const now = new Date();
    return data.filter(entry => {
      const entryDate = new Date(entry.created_at);
      if (filter === 'week') {
        return now - entryDate <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
      } else if (filter === 'month') {
        return now - entryDate <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
      } else {
        return now - entryDate <= 365 * 24 * 60 * 60 * 1000; // Last 1 year
      }
    });
  };

  // Categorize humidity into Low, Medium, and High
  const categorizeHumidity = (data) => {
    let low = 0, medium = 0, high = 0;

    data.forEach(entry => {
      if (entry.humidity < 30) low++;
      else if (entry.humidity >= 30 && entry.humidity <= 60) medium++;
      else high++;
    });

    return [
      { name: 'Low', value: low, color: '#4CAF50' },
      { name: 'Medium', value: medium, color: '#FFC107' },
      { name: 'High', value: high, color: '#F44336' },
    ];
  };

  return (
    <Wrapper>
      <Box className="box">
        <Card sx={{ border: `0px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
          <CardContent>
            {/* Header with Filter Dropdown */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="header">
              <h3 style={{ color: theme.palette.text.primary }}>Humidity</h3>
              <FormControl size="small">
                <Select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: 'none',
                    '& fieldset': { border: 'none' },
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
                  label={({ value }) => `${value}`}
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
