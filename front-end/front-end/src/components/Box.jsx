import React, { useState, useEffect } from 'react';
import '../style/box/style.css';
import { Container, Boxs, TopSegment, Strong, Figure, Image, List, ListItems, Paper } from '../style/box/style';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

export default function Box() {
  const { theme } = useTheme(); // Get the current theme
  const [beeStatus, setBeeStatus] = useState([]);
  const [hiveStatus, setHiveStatus] = useState([]);
  const [distanceDectection, setdistanceDectection] = useState([]);
  const [hiveWeight, setHiveWeight] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  // Fetch data from backend API
  useEffect(() => {
    fetch('https://bees-backend.aiiot.center/api/data')  // Update this with your API endpoint
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
          });
        }

        return response.json();
      })
      .then((data) => {
        // Limit to latest 50 records
        const latestData = data.slice(0, 50);

        // Map data into the corresponding categories
        setBeeStatus(latestData.map(item => ({

          isThreatened: item.sound_status === 1 ? 'Safe' : 'Not Normal'
        })));

        setHiveStatus(latestData.map(item => ({
          // status: item.sound_status === 0 ? 'Died' : 'Alive',
          // status: `Temperature: ${item.temperature}°C, Humidity: ${item.humidity}%`,
          details: item.light_status === 0 ? 'Close' : 'Open'
        })));

        setdistanceDectection(latestData.map(item => ({
          status: item.distance > 13 ? 'Normal' : 'Threatened',
          details: `${item.distance} cm`
        })));

        setHiveWeight(latestData.map(item => ({
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
            {beeStatus.length === 0 ? (
              <ListItems theme={theme} style={{ borderBottom: '0px', alignItems: 'center', justifyContent: 'center' }}>No bee data available</ListItems>
            ) : (
              beeStatus.map((item, index) => (
                <ListItems theme={theme} key={index}>
                   <Paper theme={theme}>{item.isThreatened}</Paper>
                  <Paper theme={theme}>{item.status}</Paper>
                 
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
              <ListItems theme={theme} style={{ borderBottom: '0px', alignItems: 'center', justifyContent: 'center' }}>No bee data available</ListItems>
            ) : (
              hiveStatus.map((item, index) => (
                <ListItems theme={theme} key={index}>
                    <Paper theme={theme}>{item.details}</Paper>
                  <Paper theme={theme}>{item.status}</Paper>
                
                </ListItems>
              ))
            )}
          </List>
        </Boxs>

        {/* Distance Detection Box */}
        <Boxs theme={theme}>
          <TopSegment>
            <Strong theme={theme}>Dis. Detection</Strong>
            <Figure>
              <Image src="https://cdn-icons-png.flaticon.com/512/1196/1196775.png" alt="" />
            </Figure>
          </TopSegment>
          <List>
            {distanceDectection.length === 0 ? (
              <ListItems theme={theme} style={{ borderBottom: '0px', alignItems: 'center', justifyContent: 'center' }}>No bee data available</ListItems>
            ) : (
              distanceDectection.map((item, index) => (
                <ListItems theme={theme} key={index}>
                   <Paper theme={theme}>{item.status}</Paper>
                   <Paper theme={theme}>{item.details}</Paper>
                   {/* <Paper theme={theme}>{item.details}</Paper> */}
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
              <ListItems theme={theme} style={{ borderBottom: '0px', alignItems: 'center', justifyContent: 'center' }}>No bee data available</ListItems>
            ) : (
              hiveWeight.map((item, index) => (
                <ListItems theme={theme} key={index}>
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
