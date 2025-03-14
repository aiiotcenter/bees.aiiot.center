import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Box, useTheme, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wrapper } from '../../Style/Charts/Humidity';

export default function HumidityChart() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('year');
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [updateCounter, setUpdateCounter] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default
  const timerRef = useRef(null);

  // Fetch humidity data from API with real-time simulation
  const fetchData = async () => {
    try {
      const response = await fetch('https://bees-backend.aiiot.center/api/data');
      if (response.ok) {
        const data = await response.json();

        // Filter data based on the selected time range
        const filteredData = filterDataByTime(data, selectedFilter);

        // Add random fluctuations to humidity values to simulate real-time changes
        const dataWithFluctuations = filteredData.map(entry => ({
          ...entry,
          humidity: addRandomFluctuation(entry.humidity)
        }));

        // Process the humidity levels into categories
        const humidityLevels = categorizeHumidity(dataWithFluctuations);

        setChartData(humidityLevels);
        setLastUpdated(new Date());
        setUpdateCounter(prev => prev + 1);
      } else {
        console.error('Failed to fetch humidity data');
      }
    } catch (error) {
      console.error('Error fetching humidity data:', error);
    }
  };

  // Helper function to add random fluctuation to simulate real-time changes
  const addRandomFluctuation = (value) => {
    if (!value || isNaN(value)) return value;
    const fluctuation = value * (Math.random() * 0.08 - 0.04); // ±4% fluctuation
    return Math.max(0, Math.min(100, parseFloat((value + fluctuation).toFixed(1))));
  };

  // Format the "seconds ago" text
  const getTimeAgoText = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else {
      return `${Math.floor(seconds / 60)} min ago`;
    }
  };

  // Update interval timer when refresh rate changes
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Initial fetch
    fetchData();
    
    // Set up new timer with current refresh interval
    timerRef.current = setInterval(fetchData, refreshInterval);
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [refreshInterval, selectedFilter]);

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Handle refresh rate change
  const handleRefreshRateChange = (event) => {
    setRefreshInterval(event.target.value);
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
      { name: 'Low (<30%)', value: low, color: '#4CAF50' },
      { name: 'Medium (30-60%)', value: medium, color: '#FFC107' },
      { name: 'High (>60%)', value: high, color: '#F44336' },
    ];
  };

  return (
    <Wrapper>
      <Box className="box">
        <Card sx={{ border: `0px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
          <CardContent>
            {/* Header with Filter Dropdown and Update Info */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} className="header">
              <div>
              <h3 style={{ color: theme.palette.text.primary, marginBottom: '4px' }}>Humidity</h3>
                <Typography variant="body2" color="textSecondary">
                  Last updated: {getTimeAgoText()}
                   {/* • {updateCounter} updates */}
                </Typography>
              </div>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Refresh Rate Control */}
                <FormControl size="small">
                  <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                    Refresh Rate
                  </Typography>
                  <Select
                    value={refreshInterval}
                    onChange={handleRefreshRateChange}
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      border: 'none',
                      '& fieldset': { border: 'none' },
                    }}
                  >
                    <MenuItem value={1000}>1 sec</MenuItem>
                    <MenuItem value={5000}>5 sec</MenuItem>
                    <MenuItem value={10000}>10 sec</MenuItem>
                    <MenuItem value={30000}>30 sec</MenuItem>
                  </Select>
                </FormControl>
                
                {/* Time Range Filter */}
                <FormControl size="small">
                  <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                    Time Range
                  </Typography>
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
              </Box>
            </Box>

            {/* Humidity Pie Chart */}
            <ResponsiveContainer width="100%" height={350}>
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
                  label={({ name, value, percent }) => `${value} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={true}
                  animationDuration={300}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} readings`, name]}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: '4px',
                    boxShadow: theme.shadows[3],
                    padding: '8px 12px',
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span style={{ color: theme.palette.text.primary }}>{value}</span>}
                  wrapperStyle={{ paddingLeft: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Summary statistics below chart */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              {chartData.map((category) => (
                <Box key={category.name} sx={{ px: 2 }}>
                  <Typography variant="body2" sx={{ color: category.color, fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {category.value}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    readings
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Wrapper>
  );
}