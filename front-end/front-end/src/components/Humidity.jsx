import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container, H2, P } from '../style/humidity/Humidity';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
import styled from 'styled-components';

export default function Humidity() {
    const { theme } = useTheme(); // Get the current theme
    const [humidityData, setHumidityData] = useState([]);
    const [error, setError] = useState(null);

    const StyledLineChart = styled(LineChart)`
        margin-top: 20px;
    `;

    useEffect(() => {
        fetch('https://bees-backend.aiiot.center/api/data') // Replace with the correct humidity API endpoint if necessary
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('API Data:', data);

                // Map humidity data to the ID
                const humData = data.slice(0, 100).map(item => ({
                    x: item.id.toString(), // Use id as x-axis value
                    y: item.humidity // Use humidity as y-axis value
                }));

                setHumidityData(humData);

                console.log('Mapped Humidity Data:', humData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);

    return (
        <Container theme={theme}>
            <H2 theme={theme}>Humidity</H2>
            <P theme={theme}>
                The honey bee humidity graph typically tracks the moisture variations within a beehive, helping beekeepers monitor the optimal conditions for hive health.
            </P>
            {error ? (
                <P theme={theme} style={{ color: 'red' }}>Error: {error}</P>
            ) : (
                <StyledLineChart
                    dataset={humidityData}
                    xAxis={[{ dataKey: 'x', label: 'ID' }]} // Use ID for the x-axis label
                    series={[{ dataKey: 'y', label: 'Humidity (%)' }]} // Display humidity
                    height={300}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            )}
        </Container>
    );
}
