import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: relative;
  width: auto;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(90deg, #A13502 0%, #FFA800CC 100%), url('https://themesflat.co/html/modhu/assets/img/banner/bg-banner.jpg') no-repeat fixed center;
  background-size: cover;
  margin-left: 0px;
  border-radius: 8px;
`;

const BannerWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BannerContent = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleBanner = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #ffeb3b;
`;

const HeadingBanner = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
  color: #ffffff;
`;

export default function DataModel() {
  const [isDataLive, setIsDataLive] = useState(false);
  const [lastDataHash, setLastDataHash] = useState('');

  // Function to create a hash of the raw data for comparison
  const hashData = (data) => {
    if (!Array.isArray(data) || data.length === 0) return '';
    return JSON.stringify(data.map(item => ({ id: item.id, timestamp: item.created_at })));
  };

  // Fetch data from API and check if data has changed
  const fetchData = async () => {
    try {
      const response = await fetch('https://bees-backend.aiiot.center/api/data');
      if (response.ok) {
        const data = await response.json();
        
        // Calculate hash of the new data
        const newDataHash = hashData(data);
        
        if (newDataHash !== lastDataHash) {
          console.log('New live data received');
          setIsDataLive(true);
          setLastDataHash(newDataHash);
        } else {
          console.log('No new data detected');
          setIsDataLive(false);
        }
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts and periodically check for updates
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Check every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <BannerWrap>
        <BannerContent>
          <TitleBanner>Welcome to the AI-based Beekeeping and Hive Monitoring System</TitleBanner>
          <HeadingBanner>
            {isDataLive
              ? 'Live data from the Bee Colony or Bee Hives is being transmitted in real-time.'
              : 'We are providing access to previously recorded data.'}
          </HeadingBanner>
        </BannerContent>
      </BannerWrap>
    </Container>
  );
}
