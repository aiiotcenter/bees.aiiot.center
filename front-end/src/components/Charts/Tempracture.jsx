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
    const timerRef = useRef(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [lastDataHash, setLastDataHash] = useState('');
    const abortControllerRef = useRef(null);

    // Function to create a deep hash of the data for precise comparison
    const hashData = (data) => {
        if (!Array.isArray(data) || data.length === 0) return '';
        return JSON.stringify(data.slice(0, dataLimit).map(item => ({
            id: item.id,
            temperature: item.temperature,
            timestamp: item.created_at
        })));
    };

    // Function to fetch data with optimized cancellation
    const fetchData = async () => {
        // Cancel any existing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            const response = await fetch('https://bees-backend.aiiot.center/api/data', { signal });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            // Calculate hash of the new data
            const newDataHash = hashData(data);
            
            // Only process and update if data has changed
            if (newDataHash !== lastDataHash) {
                console.log("Data changed, updating chart");
                
                // Process data with minimal fluctuations
                const formattedData = data
                    .slice(0, dataLimit)
                    .map(entry => ({
                        id: entry.id,
                        temperature: parseFloat((entry.temperature + (Math.random() * 0.2 - 0.1)).toFixed(2)),
                        created_at: new Date(entry.created_at || Date.now()).toLocaleString(),
                    }));
                
                // Update states
                setRawData(data);
                setChartData(formattedData);
                setLastDataHash(newDataHash);
                setIsDataUpdated(true);
                setLastUpdated(new Date());
                setUpdateCounter(prev => prev + 1);
            } else {
                console.log("No data change detected, skipping update");
                setIsDataUpdated(false);
            }
        } catch (error) {
            // Only log error if it's not an abort error
            if (error.name !== 'AbortError') {
                console.error('Error fetching data:', error);
            }
        }
    };

    // Effect to handle data limit changes
    useEffect(() => {
        if (rawData.length > 0) {
            const formattedData = rawData
                .slice(0, dataLimit)
                .map(entry => ({
                    id: entry.id,
                    temperature: parseFloat((entry.temperature + (Math.random() * 0.2 - 0.1)).toFixed(2)),
                    created_at: new Date(entry.created_at || Date.now()).toLocaleString(),
                }));
            
            setChartData(formattedData);
        }
    }, [dataLimit]);

    // Effect to handle initial data fetch
    useEffect(() => {
        // Fetch data immediately
        fetchData();

        // Set up timer to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clean up on unmount
        return () => {
            clearInterval(intervalId);
            // Abort any ongoing fetch
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Handler for data limit change
    const handleDataLimitChange = (event) => {
        setDataLimit(event.target.value);
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

    return (
        <Wrapper>
            <Box className="box">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                            <CardContent>
                                {/* Header Section */}
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