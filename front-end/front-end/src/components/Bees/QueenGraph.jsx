import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container, H2, P } from '../../style/temprature/style';
import { useTheme } from '../../context/ThemeContext'; // Import useTheme hook
import styled from 'styled-components';

export default function QueenGraph() {
    const { theme } = useTheme(); // Get the current theme
    const [temperatureData, setTemperatureData] = useState([]);
    const [error, setError] = useState(null);

    const StyledLineChart = styled(LineChart)`
        margin-top: 20px;
    `;

    useEffect(() => {
        fetch('https://bees.aiiot-backend.center:5000/api/data')
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                // Log the raw data for debugging
                console.log('API Data:', data);

                // Map temperature data to the ID
                const tempData = data.slice(0, 100).map(item => ({
                    x: item.id.toString(), // Use id as x-axis value
                    y: item.temperature // Use temperature as y-axis value
                }));

                setTemperatureData(tempData);

                // Log the mapped temperature data for debugging
                console.log('Mapped Temperature Data:', tempData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);
  return (
    <>
        {error ? (
                    <P theme={theme} style={{ color: 'red' }}>Error: {error}</P>
                ) : (
                    <StyledLineChart
                        dataset={temperatureData}
                        xAxis={[{ dataKey: 'x', label: 'ID' }]} // Use ID for the x-axis label
                        series={[{ dataKey: 'y', label: 'Temperature (°C)' }]} // Display temperature
                        height={300}
                        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        grid={{ vertical: true, horizontal: true }}
                    />
                )}
    </>
  )
}
