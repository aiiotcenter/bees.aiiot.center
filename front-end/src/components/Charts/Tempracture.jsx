import React, { useState, useEffect } from 'react';
import { Wrapper } from '../../Style/Charts/Tempracture';
import { Box, Grid, Card, CardContent, useTheme, MenuItem, Select, FormControl } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, CartesianGrid } from 'recharts';

export default function TemperatureChart() {
    const theme = useTheme();
    const [selectedFilter, setSelectedFilter] = useState('year');
    const [chartData, setChartData] = useState([]);
    const [dataLimit, setDataLimit] = useState(50); // Default limit to 100

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('https://bees-backend.aiiot.center/api/data');
            const data = await response.json();

            // Process data and limit results
            const formattedData = data
                .slice(0, dataLimit) // Limit the number of entries
                .map(entry => ({
                    id: entry.id,
                    temperature: entry.temperature,
                    created_at: new Date(entry.created_at).toLocaleString(), // Format the date
                }));

            setChartData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

        // Set up interval to fetch data every 5 minutes (300000 ms)
        const interval = setInterval(fetchData, 300000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [dataLimit]); // Re-fetch data when limit changes

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleDataLimitChange = (event) => {
        setDataLimit(event.target.value);
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
                                    <h3 style={{ color: theme.palette.text.primary }}>Temperature</h3>

                                    {/* Filters Section */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {/* Time Range Filter */}

                                        {/* Data Limit Filter */}
                                        <FormControl size="small">
                                            <Select
                                                value={dataLimit}
                                                onChange={handleDataLimitChange}
                                                sx={{
                                                    backgroundColor: theme.palette.background.default,
                                                    border: 'none',
                                                    '& fieldset': { border: 'none' },
                                                }}
                                            >
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                                <MenuItem value={150}>150</MenuItem>
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
                                        <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }} />
                                        <Legend />
                                        <Area type="monotone" dataKey="temperature" stroke={theme.palette.primary.main} fill="url(#temperatureGradient)" strokeWidth={2} />
                                        <Line type="monotone" dataKey="temperature" stroke={theme.palette.success.main} strokeWidth={2} />
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
