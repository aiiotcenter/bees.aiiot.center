import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun and moon icons
import { useTheme } from '../context/ThemeContext'; // Assuming you have ThemeContext setup for managing dark/light mode
import { Container, ExpandWrapper, Icon, Left, ModeWrapper, NotificationWrapper, Right, Title, UserWrapper, Wrapper, ToggleButtonWrapper, Paper, Figure, Image } from '../style/header/Style'; // Adjust import path to your style file
import NotificationsIcon from '@mui/icons-material/Notifications';
import AllOutIcon from '@mui/icons-material/AllOut';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ isCollapsed }) => {
  const { theme, toggleTheme } = useTheme(); // Using theme and toggleTheme from context
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      // Exit fullscreen if it's already fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Request fullscreen on the document or a specific element
      const element = document.documentElement; // You can change this to a specific container element if needed
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen); // Toggle full-screen state
  };

  return (
    <Container isCollapsed={isCollapsed} theme={theme}>
      <Wrapper>
        <Left>
          <Title>Bee Keeping</Title>
        </Left>
        <Right>
          <ModeWrapper>
            <ToggleButtonWrapper theme={theme} onClick={toggleTheme}>
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </ToggleButtonWrapper>
          </ModeWrapper>
          <NotificationWrapper>
            <Icon><NotificationsIcon /></Icon>
          </NotificationWrapper>
          <ExpandWrapper onClick={toggleFullScreen}>
            <AllOutIcon />
          </ExpandWrapper>
          <UserWrapper theme={theme}>
            <AccountCircleIcon style={{ fontSize: '48px'}} />
          </UserWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
