import React, { useState, useEffect } from 'react';
import { Image, ScreenWrapper, Text, Frame } from '../../style/live/style';
import { useTheme } from '../../context/ThemeContext';

export default function Live() {
  const { theme, toggleTheme } = useTheme(); 
  const [videoSrc, setVideoSrc] = useState("https://beesscamera.serveo.net/?action=stream");

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoSrc(`https://beesscamera.serveo.net/?action=stream&t=${new Date().getTime()}`);
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
          src={videoSrc}  // Dynamically change the src
          frameBorder="0"
          allowFullScreen
          title="Live Stream Video"
        ></Frame>        
        {/* If you're using an image instead of iframe */}
        <Image theme={theme}
          src="https://beesscamera.serveo.net/?action=stream"
          alt="Live Stream"
        />
      </ScreenWrapper>
    </>
  );
}
