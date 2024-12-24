import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from '../api/temprature';
import { Container, H2, P } from '../style/temprature/style';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
import styled from 'styled-components';

export default function Temperature() {
    const { theme } = useTheme(); // Get the current theme
    const StyledLineChart = styled(LineChart)`

`;
    return (
        <>
            <Container theme={theme}>
                <H2 theme={theme}>Temperature</H2>
                <P theme={theme}>The honey bee temperature graph typically tracks the temperature variations within a beehive, helping beekeepers monitor the optimal conditions for hive health.</P>
                <LineChart
                    dataset={dataset}
                    xAxis={[{ dataKey: 'x' }]}
                    series={[{ dataKey: 'y' }]}
                    height={300}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </Container>
        </>
    )
}
