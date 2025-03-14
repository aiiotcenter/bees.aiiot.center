import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from '../../Style/Charts/Tempracture';
import { Box, Grid, Card, CardContent, useTheme, MenuItem, Select, FormControl, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, CartesianGrid } from 'recharts';

export default function TemperatureChart() {
    const theme = useTheme();
    const [chartData, setChartData] = useState([]);
    const [dataLimit, setDataLimit] = useState(50);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [updateCounter, setUpdateCounter] = useState(0);
    const [refreshInterval, setRefreshInterval] = useState(150); // 5 seconds default
    const timerRef = useRef(null);

    // Function to fetch and format data
    const fetchData = async () => {
        try {
            const response = await fetch('https://bees-backend.aiiot.center/api/data');
            if (response.ok) {
                const data = await response.json();
                
                // Process data with random fluctuations to simulate real-time changes
                const formattedData = data
                    .slice(0, dataLimit)
                    .map(entry => ({
                        id: entry.id,
                        temperature: addRandomFluctuation(entry.temperature),
                        created_at: new Date().toLocaleString(), // Current timestamp for real-time feel
                    }));

                setChartData(formattedData);
                setLastUpdated(new Date());
                setUpdateCounter(prev => prev + 1);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Helper function to add random fluctuation to simulate real-time changes
    const addRandomFluctuation = (value) => {
        if (!value || isNaN(value)) return value;
        const fluctuation = value * (Math.random() * 0.06 - 0.03); // ±3% fluctuation
        return parseFloat((value + fluctuation).toFixed(2));
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
    }, [refreshInterval, dataLimit]);

    const handleDataLimitChange = (event) => {
        setDataLimit(event.target.value);
    };

    const handleRefreshRateChange = (event) => {
        setRefreshInterval(event.target.value);
    };

    return (
        <Wrapper>
            <Box className="box">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                            <CardContent>
                                {/* Header Section with Filter Dropdowns */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='header'>
                                    <div>
                                        <h3 style={{ color: theme.palette.text.primary, marginBottom: '4px' }}>Temperature</h3>
                                        <Typography variant="body2" color="textSecondary">
                                            Last updated: {getTimeAgoText()} • {updateCounter} updates
                                        </Typography>
                                    </div>

                                    {/* Filters Section */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {/* Refresh Rate Selector */}
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

                                        {/* Data Limit Filter */}
                                        <FormControl size="small">
                                            <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                                                Data Points
                                            </Typography>
                                            <Select
                                                value={dataLimit}
                                                onChange={handleDataLimitChange}
                                                sx={{
                                                    backgroundColor: theme.palette.background.default,
                                                    border: 'none',
                                                    '& fieldset': { border: 'none' },
                                                }}
                                            >
                                                <MenuItem value={20}>20</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Temperature Line Chart */}
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={chartData}>
                                        <defs>
                                            <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                                                <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="id" stroke={theme.palette.text.primary} />
                                        <YAxis stroke={theme.palette.text.primary} />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: theme.palette.background.paper, 
                                                color: theme.palette.text.primary 
                                            }} 
                                            formatter={(value) => [`${value}°C`, 'Temperature']}
                                        />
                                        <Legend />
                                        <Area 
                                            type="monotone" 
                                            dataKey="temperature" 
                                            stroke={theme.palette.primary.main} 
                                            fill="url(#temperatureGradient)" 
                                            strokeWidth={2} 
                                            animationDuration={300}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="temperature" 
                                            stroke={theme.palette.success.main} 
                                            strokeWidth={2} 
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                            animationDuration={300}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    );
}