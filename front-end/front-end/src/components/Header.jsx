import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Container, ExpandWrapper, Icon, Left, ModeWrapper, NotificationWrapper, Right, Title, Wrapper, ToggleButtonWrapper, NotificationWrapperBox, NBox, NInner, NTop, NMiddle, NBottom, NLeft, NRight, MLeft, MRight, MLWrapper, MRText, MRPaper, UserWrapper, DropdownWrapper, DropdownItem, MiddleWrapper } from '../style/header/Style'; 
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
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleNotification = (event) => {
    event.stopPropagation();
    setIsNotificationOpen((prevState) => !prevState);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const currentTime = new Date();
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
        const fromTimestamp = oneHourAgo.toISOString();
        const toTimestamp = currentTime.toISOString();

        const response = await fetch(`http://bees.aiiot.center/api/data?from=${fromTimestamp}&to=${toTimestamp}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const data = await response.json();
        const notificationsData = data.map((item, index) => ({
          id: index,
          message: `Temperature: ${item.temperature}°C, Humidity: ${item.humidity}%`,
          time: new Date(item.timestamp).toLocaleTimeString(),
        })).slice(0, 10);

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
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

          <NotificationWrapper theme={theme} onClick={toggleNotification}>
            <Icon>
              <NotificationsIcon />
            </Icon>
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
                    </NTop>
                    <MiddleWrapper>
                      {notifications.map(({ id, message, time }) => (
                        <NMiddle theme={theme} key={id}>
                          <MLeft theme={theme}>
                            <MLWrapper theme={theme}>
                              <ErrorOutlineIcon />
                              <div>
                                <MRText theme={theme}>{message}</MRText>
                                <MRPaper theme={theme}>{time}</MRPaper>
                              </div>
                            </MLWrapper>
                          </MLeft>
                        </NMiddle>
                      ))}
                    </MiddleWrapper>
                  </NInner>
                </NBox>
              </NotificationWrapperBox>
            )}
          </NotificationWrapper>

          <ExpandWrapper onClick={toggleFullScreen}>
            <AllOutIcon />
          </ExpandWrapper>

          <UserWrapper theme={theme}>
            <AccountCircleIcon style={{ fontSize: '48px' }} onClick={toggleDropdown} />
            {isDropdownOpen && (
              <DropdownWrapper ref={dropdownRef} theme={theme} onClick={(e) => e.stopPropagation()}>
                <DropdownItem theme={theme}>Profile</DropdownItem>
                <DropdownItem theme={theme}>Settings</DropdownItem>
                <DropdownItem theme={theme}>
                  <Link to="/">Logout</Link>
                </DropdownItem>
              </DropdownWrapper>
            )}
          </UserWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;