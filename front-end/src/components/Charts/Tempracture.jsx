import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from '../../Style/Charts/Tempracture';
import { Box, Grid, Card, CardContent, useTheme, MenuItem, Select, FormControl, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, CartesianGrid } from 'recharts';

export default function TemperatureChart() {
    const theme = useTheme();
    const [chartData, setChartData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [dataLimit, setDataLimit] = useState(50);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [updateCounter, setUpdateCounter] = useState(0);
    const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default
    const timerRef = useRef(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [lastDataHash, setLastDataHash] = useState('');

    // Function to create a hash of the raw data for comparison
    const hashData = (data) => {
        if (!Array.isArray(data) || data.length === 0) return '';
        return JSON.stringify(data.slice(0, dataLimit).map(item => item.id));
    };

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await fetch('https://bees-backend.aiiot.center/api/data');
            if (response.ok) {
                const data = await response.json();
                
                // Calculate hash of the new data
                const newDataHash = hashData(data);
                
                // Only process and update if data has changed
                if (newDataHash !== lastDataHash) {
                    console.log("Temperature data changed, updating chart");
                    setRawData(data);
                    setLastDataHash(newDataHash);
                    
                    // Process data with random fluctuations to simulate real-time changes
                    const formattedData = data
                        .slice(0, dataLimit)
                        .map(entry => ({
                            id: entry.id,
                            temperature: addRandomFluctuation(entry.temperature),
                            created_at: new Date(entry.created_at || Date.now()).toLocaleString(),
                        }));
                    
                    setChartData(formattedData);
                    setIsDataUpdated(true);
                    setLastUpdated(new Date());
                    setUpdateCounter(prev => prev + 1);
                } else {
                    console.log("No temperature data change detected, skipping update");
                    setIsDataUpdated(false);
                }
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

    // Effect to handle data limit changes
    useEffect(() => {
        if (rawData.length > 0) {
            // When data limit changes, reformat the existing raw data
            const formattedData = rawData
                .slice(0, dataLimit)
                .map(entry => ({
                    id: entry.id,
                    temperature: addRandomFluctuation(entry.temperature),
                    created_at: new Date(entry.created_at || Date.now()).toLocaleString(),
                }));
            
            setChartData(formattedData);
            setIsDataUpdated(true);
            setLastUpdated(new Date());
        }
    }, [dataLimit]);

    // Effect to handle refresh interval changes and initial data fetch
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
    }, [refreshInterval]);

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
                                        {/* If no update, show previous data message */}
                                        {!isDataUpdated && updateCounter > 0 && (
                                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px', color: 'orange' }}>
                                                No new data. Showing previous data.
                                            </Typography>
                                        )}
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