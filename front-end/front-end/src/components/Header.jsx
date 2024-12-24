import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Container, ExpandWrapper, Icon, Left, ModeWrapper, NotificationWrapper, Right, Title, Wrapper, ToggleButtonWrapper, Paper, NotificationWrapperBox, NBox, NInner, NTop, NMiddle, NBottom, NLeft, NRight, MLeft, MRight, MLWrapper, MLFigure, MLImage, MRText, MRPaper, UserWrapper, DropdownWrapper, DropdownItem } from '../style/header/Style'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import AllOutIcon from '@mui/icons-material/AllOut';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Header = ({ isCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notification visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const notificationRef = useRef(null); // Ref for NotificationWrapperBox
  const dropdownRef = useRef(null); // Ref for DropdownWrapper

  // Toggle FullScreen
  const toggleFullScreen = () => {
    if (isFullScreen) {
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
      const element = document.documentElement;
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
    setIsFullScreen(!isFullScreen);
  };

  // Toggle Notification
  const toggleNotification = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close Dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          {/* <NotificationWrapper onClick={toggleNotification}>
            <Icon><NotificationsIcon /></Icon>
            {isNotificationOpen && (
              <NotificationWrapperBox ref={notificationRef}>
                <NBox>
                  <NInner>
                    <NTop>
                      <NLeft>
                        <strong>Notifications</strong>
                        <span>(03)</span>
                      </NLeft>
                      <NRight>
                        <strong style={{ cursor: 'pointer' }}>Clear All</strong>
                      </NRight>
                    </NTop>
                    <NMiddle>
                      <MLeft>
                        <MLWrapper>
                          <div className="left">
                            <ErrorOutlineIcon />
                          </div>
                          <div className="right">
                            <MRText>A new user added in Daxa</MRText>
                            <MRPaper>3 hrs ago</MRPaper>
                          </div>
                        </MLWrapper>
                      </MLeft>
                    </NMiddle>
                    <NBottom></NBottom>
                  </NInner>
                </NBox>
              </NotificationWrapperBox>
            )}
          </NotificationWrapper> */}
          <NotificationWrapper theme={theme} onClick={toggleNotification}>
          <Icon> <NotificationsIcon onClick={toggleDropdown} /></Icon>
            {isDropdownOpen && (
              <DropdownWrapper ref={dropdownRef} theme={theme}>
                <DropdownItem theme={theme}>Profile</DropdownItem>
                <DropdownItem theme={theme}>Settings</DropdownItem>
                <DropdownItem theme={theme}>Logout</DropdownItem>
              </DropdownWrapper>
            )}
          </NotificationWrapper>
          <ExpandWrapper onClick={toggleFullScreen}>
            <AllOutIcon />
          </ExpandWrapper>
          <UserWrapper theme={theme}>
            <AccountCircleIcon style={{ fontSize: '48px' }} onClick={toggleDropdown} />
            {isDropdownOpen && (
              <DropdownWrapper ref={dropdownRef} theme={theme}>
                <DropdownItem theme={theme}>Profile</DropdownItem>
                <DropdownItem theme={theme}>Settings</DropdownItem>
                <DropdownItem theme={theme}>Logout</DropdownItem>
              </DropdownWrapper>
            )}
          </UserWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
