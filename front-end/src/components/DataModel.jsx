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
  overflow: hidden;
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
  border-radius: 0px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
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

const PhoneNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 5px;
  color: #ffeb3b;
`;

export default function DataModel() {
  const [isDataLive, setIsDataLive] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  // Fetch data from the API to determine if it's live
  const fetchData = async () => {
    try {
      const response = await fetch('https://bees-backend.aiiot.center/api/data');
      if (response.ok) {
        const data = await response.json();
        
        // Assuming data has a "created_at" field (you can adjust as per your actual data structure)
        const latestData = data[data.length - 1]; // Get the latest data
        const latestTimestamp = new Date(latestData.created_at);
        
        // Set last update time and determine if the data is live
        setLastUpdateTime(latestTimestamp);
        
        // Check if the data was updated recently (e.g., within the last 60 seconds)
        const currentTime = new Date();
        const timeDiff = (currentTime - latestTimestamp) / 1000; // time difference in seconds

        setIsDataLive(timeDiff < 60); // Consider it live if updated within the last minute
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

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <BannerWrap>
        <BannerContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TitleBanner>Welcome to the AI-based Beekeeping and Hive Monitoring System</TitleBanner>

          {/* Conditionally render the HeadingBanner */}
          <HeadingBanner>
            {isDataLive
              ? 'Live data from the Bee Colony or Bee Hives is being transmitted in real-time.'
              : 'We are providing access to previously recorded data.'}
          </HeadingBanner>

          {/* <PhoneNumber>+555 666 999 00</PhoneNumber> */}
        </BannerContent>
      </BannerWrap>
    </Container>
  );
}
