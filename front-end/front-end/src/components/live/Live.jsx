import React, { useState } from 'react';
import { ScreenWrapper, Text, Frame } from '../../style/live/style';
import { useTheme } from '../../context/ThemeContext';

export default function Live() {
  const { theme } = useTheme(); 
  const [currentView, setCurrentView] = useState('live'); // Default to 'live'

  const views = {
    live: "https://livemybees.aiiot.center",
    disease: "https://avatar.aiiot.center/", // Replace with actual URL
    status: "https://health.aiiot.center/login/"   // Replace with actual URL
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: theme === 'dark' ? '#333' : '#007BFF',
    color: theme === 'dark' ? '#FFF' : '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.2s',
  };

  const buttonHoverStyle = {
    backgroundColor: theme === 'dark' ? '#555' : '#0056b3',
    transform: 'scale(1.05)',
  };

  return (
    <>
      <Text theme={theme}>Live Dashboard</Text>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {Object.keys(views).map((view) => (
          <button
            key={view}
            onClick={() => handleViewChange(view)}
            style={{
              ...buttonStyle,
              ...(currentView === view ? buttonHoverStyle : {}),
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>
      <ScreenWrapper theme={theme} style={{
        position: 'relative',
        height: '100vh', // Full height of the viewport
        width: '100vw', // Full width of the viewport
        background: '#000'
      }}>
        <Frame
          key={currentView}
          src={views[currentView]}
          frameBorder="0"
          allowFullScreen
          title={`${currentView.charAt(0).toUpperCase() + currentView.slice(1)} View`}
        ></Frame>
      </ScreenWrapper>
    </>
  );
}
