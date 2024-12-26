import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Container, ExpandWrapper, Icon, Left, ModeWrapper, NotificationWrapper, Right, Title, Wrapper, ToggleButtonWrapper, NotificationWrapperBox, NBox, NInner, NTop, NMiddle, NBottom, NLeft, NRight, MLeft, MRight, MLWrapper, MLFigure, MLImage, MRText, MRPaper, UserWrapper, DropdownWrapper, DropdownItem } from '../style/header/Style'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import AllOutIcon from '@mui/icons-material/AllOut';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Alert } from '../style/common/style';
import { Link } from 'react-router-dom'; 

const Header = ({ isCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [notifications, setNotifications] = useState([]); // Add notifications state
  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

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

  // Toggle Notification visibility
  const toggleNotification = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
    setIsNotificationOpen((prevState) => !prevState);
  };

  // Toggle User Profile Dropdown visibility
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown and notification if clicked outside
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

  useEffect(() => {
    fetch('https://bees.aiiot.center:5000/api/data')  // Update this with your API endpoint
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Variables to track highest values
        let maxTemperature = -Infinity;
        let maxHumidity = -Infinity;
        let maxWeight = -Infinity;
        let maxDistance = -Infinity;
        let maxSoundStatus = -Infinity;

        // Iterate through the data to find the highest values
        data.forEach(item => {
          maxTemperature = Math.max(maxTemperature, item.temperature);
          maxHumidity = Math.max(maxHumidity, item.humidity);
          maxWeight = Math.max(maxWeight, item.weight);
          maxDistance = Math.max(maxDistance, item.distance);
          maxSoundStatus = Math.max(maxSoundStatus, item.sound_status);
        });

        // Log the highest values
        console.log('Highest Temperature:', maxTemperature);
        console.log('Highest Humidity:', maxHumidity);
        console.log('Highest Weight:', maxWeight);
        console.log('Highest Distance:', maxDistance);
        console.log('Highest Sound Status:', maxSoundStatus);

        // Map the fetched data into notifications
        const notificationsData = data.map((item, index) => ({
          id: index,  // Ensure unique id for each notification
          message: `Temperature: ${item.temperature}°C, Humidity: ${item.humidity}%`, // Customize the message
          time: 'Just now' // Customize time if needed, you can use timestamps if available
        }));

        // Update notifications state
        setNotifications(notificationsData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

          {/* Notification Box */}
          <NotificationWrapper 
            theme={theme} 
            onClick={toggleNotification} // This will toggle notification visibility
          >
            <Icon>
              <NotificationsIcon />
            </Icon>

            {/* Dynamic Alert Badge */}
            <Alert theme={theme} className="alert">
              {notifications.length}
            </Alert>

            {isNotificationOpen && (
              <NotificationWrapperBox theme={theme} ref={notificationRef} onClick={(e) => e.stopPropagation()}>
                <NBox theme={theme}>
                  <NInner theme={theme}>
                    <NTop theme={theme}>
                      <NLeft theme={theme}>
                        <strong>Notifications</strong>
                        <span>({notifications.length})</span>
                      </NLeft>
                      <NRight theme={theme}>
                        {/* <strong style={{ cursor: 'pointer' }}>Clear All</strong> */}
                      </NRight>
                    </NTop>

                    {notifications.map((notification) => (
                      <NMiddle theme={theme} key={notification.id}>
                        <MLeft theme={theme}>
                          <MLWrapper theme={theme}>
                            <div className="left">
                              <ErrorOutlineIcon />
                            </div>
                            <div className="right">
                              <MRText theme={theme}>{notification.message}</MRText>
                              <MRPaper theme={theme}>{notification.time}</MRPaper>
                            </div>
                          </MLWrapper>
                        </MLeft>
                      </NMiddle>
                    ))}

                    <NBottom></NBottom>
                  </NInner>
                </NBox>
              </NotificationWrapperBox>
            )}
          </NotificationWrapper>

          {/* Fullscreen Toggle */}
          <ExpandWrapper onClick={toggleFullScreen}>
            <AllOutIcon />
          </ExpandWrapper>

          {/* User Profile Box */}
          <UserWrapper theme={theme}>
            <AccountCircleIcon style={{ fontSize: '48px' }} onClick={toggleDropdown} />
            {isDropdownOpen && (
              <DropdownWrapper ref={dropdownRef} theme={theme} onClick={(e) => e.stopPropagation()}>
                <DropdownItem theme={theme}>Profile</DropdownItem>
                <DropdownItem theme={theme}>Settings</DropdownItem>
                <DropdownItem theme={theme}><Link to='/'>Logout</Link></DropdownItem>
              </DropdownWrapper>
            )}
          </UserWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
