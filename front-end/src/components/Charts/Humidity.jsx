import React from 'react';
import { Card, CardContent, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wrapper } from '../../Style/Charts/Humidity';

const trafficData = [
  { name: 'Direct', value: 32, color: '#4CAF50' },
  { name: 'Referral', value: 28, color: '#FFC107' },
  { name: 'Organic', value: 40, color: '#F44336' },
];

export default function TrafficChart() {
  const theme = useTheme();

  return (
    <>
    <Wrapper>
    <Box className='box'>
      <Card sx={{ border: `0px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
        <CardContent>
          <h3 style={{ color: theme.palette.text.primary }}>Humidity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={trafficData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                label={({ name, value }) => `${value}%`}
              >
                {trafficData.map((entry, index) => (
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
                formatter={(value, entry) => (
                  <span style={{ color: theme.palette.text.primary }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
    </Wrapper>
    </>
  );
}
