import React, { useState, useEffect } from 'react';
import { Image, ScreenWrapper, Text, Frame } from '../../style/live/style';
import { useTheme } from '../../context/ThemeContext';

export default function Live() {
  const { theme, toggleTheme } = useTheme(); 
  const [videoSrc, setVideoSrc] = useState("https://livebees.aiiot.center");

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoSrc(`https://livebees.aiiot.center?timestamp=${new Date().getTime()}`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Text theme={theme}>Live Streaming</Text>
      <ScreenWrapper theme={theme} style={{
        position: 'relative',
        height: '100vh',  // Full height of the viewport
        width: '100vw',  // Full width of the viewport
        background: '#000'
      }}>
        {/* Use an iframe or image depending on your content */}
        <Frame
          key={videoSrc}  // Add key to force re-render
          src={videoSrc}  // Dynamically change the src
          frameBorder="0"
          allowFullScreen
          title="Live Stream Video"
        ></Frame>        
        {/* If you're using an image instead of iframe */}
        {/* <Image theme={theme}
          src="https://beesscamera.pagekite.me/?action=stream"
          alt="Live Stream"
        /> */}
      </ScreenWrapper>
    </>
  );
}
