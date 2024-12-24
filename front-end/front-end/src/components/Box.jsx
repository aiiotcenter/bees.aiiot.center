import React, { useState, useEffect } from 'react';
import '../style/box/style.css';
import { Container, Boxs, TopSegment, Strong, Figure, Image, List, ListItems, Paper } from '../style/box/style';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

export default function Box() {
  const { theme } = useTheme(); // Get the current theme
  const [beeStatus, setBeeStatus] = useState([]);
  const [hiveStatus, setHiveStatus] = useState([]);
  const [diseaseDetection, setDiseaseDetection] = useState([]);
  const [hiveWeight, setHiveWeight] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  // Fetch data from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/data')  // Update this with your API endpoint
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
          });
        }

        return response.json();
      })
      .then((data) => {
        // Map data into the corresponding categories
        setBeeStatus(data.map(item => ({
          status: `Temperature: ${item.temperature}°C, Humidity: ${item.humidity}%`,
          isThreatened: item.sound_status === 1 ? 'Threatened' : 'Safe'
        })));

        setHiveStatus(data.map(item => ({
          status: item.distance === 0 ? 'No movement' : 'Movement detected',
          details: `Weight: ${item.weight} kg`
        })));

        setDiseaseDetection(data.map(item => ({
          status: item.temperature > 30 ? 'High Risk' : 'Normal',
          details: 'Monitor hive activity'
        })));

        setHiveWeight(data.map(item => ({
          status: item.weight > 0 ? 'Normal' : 'Underweight',
          details: `Current Weight: ${item.weight} kg`
        })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  return (
    <>
      <Container className="box-wrapper" theme={theme}>
        {/* Bee Status Box */}
        <Boxs theme={theme}>
          <TopSegment>
            <Strong theme={theme}>Bee Status</Strong>
            <Figure>
              <Image src="https://cdn-icons-png.flaticon.com/512/6958/6958528.png" alt="" />
            </Figure>
          </TopSegment>
          <List>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {beeStatus.length === 0 ? (
              <li>No bee data available</li>
            ) : (
              beeStatus.map((item, index) => (
                <ListItems key={index}>
                  <Paper theme={theme}>{item.status}</Paper>
                  <Paper theme={theme}>{item.isThreatened}</Paper>
                </ListItems>
              ))
            )}
          </List>
        </Boxs>

        {/* Hive Status Box */}
        <Boxs theme={theme}>
          <TopSegment>
            <Strong theme={theme}>Hive Status</Strong>
            <Figure>
              <Image src="https://media.istockphoto.com/id/1053125290/vector/honeycomb-bee-icon-on-white-background-honeycomb-icon-for-your-web-site-design-logo-app-ui.jpg?s=612x612&w=0&k=20&c=n2htoITKNLJI3HMC_bp6Ku8BpHq3AYV-C9MEXScMNmc=" alt="" />
            </Figure>
          </TopSegment>
          <List>
            {hiveStatus.length === 0 ? (
              <li>No hive data available</li>
            ) : (
              hiveStatus.map((item, index) => (
                <ListItems key={index}>
                  <Paper theme={theme}>{item.status}</Paper>
                  <Paper theme={theme}>{item.details}</Paper>
                </ListItems>
              ))
            )}
          </List>
        </Boxs>

        {/* Disease Detection Box */}
        <Boxs theme={theme}>
          <TopSegment>
            <Strong theme={theme}>Dis. Detection</Strong>
            <Figure>
              <Image src="https://cdn-icons-png.flaticon.com/512/1196/1196775.png" alt="" />
            </Figure>
          </TopSegment>
          <List>
            {diseaseDetection.length === 0 ? (
              <li>No disease detection data available</li>
            ) : (
              diseaseDetection.map((item, index) => (
                <ListItems key={index}>
                  <Paper theme={theme}>{item.status}</Paper>
                  <Paper theme={theme}>{item.details}</Paper>
                </ListItems>
              ))
            )}
          </List>
        </Boxs>

        {/* Hive Weight Box */}
        <Boxs theme={theme}>
          <TopSegment>
            <Strong theme={theme}>Hive Weight</Strong>
            <Figure>
              <Image src="https://static.vecteezy.com/system/resources/previews/018/765/604/non_2x/scale-icon-in-flat-style-weight-balance-illustration-on-isolated-background-equiListItemsbrium-comparison-sign-business-concept-vector.jpg" alt="" />
            </Figure>
          </TopSegment>
          <List>
            {hiveWeight.length === 0 ? (
              <li>No hive weight data available</li>
            ) : (
              hiveWeight.map((item, index) => (
                <ListItems key={index}>
                  <Paper theme={theme}>{item.status}</Paper>
                  <Paper theme={theme}>{item.details}</Paper>
                </ListItems>
              ))
            )}
          </List>
        </Boxs>
      </Container>
    </>
  );
}
