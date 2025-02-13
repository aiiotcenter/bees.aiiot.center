import React, { useState } from 'react';
import { Wrapper } from '../../Style/Charts/Tempracture';
import { Box, Grid, Card, CardContent, useTheme, MenuItem, Select, FormControl } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, CartesianGrid } from 'recharts';

// Mock data for different time filters
const temperatureData = {
    week: [
        { name: 'Mon', temperature: 5 },
        { name: 'Tue', temperature: 10 },
        { name: 'Wed', temperature: 12 },
        { name: 'Thu', temperature: 15 },
        { name: 'Fri', temperature: 18 },
        { name: 'Sat', temperature: 20 },
        { name: 'Sun', temperature: 22 }
    ],
    month: [
        { name: 'Week 1', temperature: 10 },
        { name: 'Week 2', temperature: 15 },
        { name: 'Week 3', temperature: 20 },
        { name: 'Week 4', temperature: 25 }
    ],
    year: [
        { name: 'Jan', temperature: -2 },
        { name: 'Feb', temperature: 0 },
        { name: 'Mar', temperature: 5 },
        { name: 'Apr', temperature: 10 },
        { name: 'May', temperature: 15 },
        { name: 'Jun', temperature: 20 },
        { name: 'Jul', temperature: 25 },
        { name: 'Aug', temperature: 23 },
        { name: 'Sep', temperature: 18 },
        { name: 'Oct', temperature: 10 },
        { name: 'Nov', temperature: 5 },
        { name: 'Dec', temperature: 0 }
    ]
};

export default function TemperatureChart() {
    const theme = useTheme();
    const [selectedFilter, setSelectedFilter] = useState('year');
    const [chartData, setChartData] = useState(temperatureData[selectedFilter]);

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setSelectedFilter(newFilter);
        setChartData(temperatureData[newFilter]);
    };

    return (
        <Wrapper>
            <Box className="box">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ borderRadius: '8px', boxShadow: theme.shadows[1] }}>
                            <CardContent>
                                {/* Header Section with Filter Dropdown */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='header'>
                                    <h3 style={{ color: theme.palette.text.primary }}>Temperature</h3>
                                    <FormControl size="small">
                                        <Select
                                            value={selectedFilter}
                                            onChange={handleFilterChange}
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
                                        <XAxis dataKey="name" stroke={theme.palette.text.primary} />
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
