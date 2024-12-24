import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Container, ExpandWrapper, Icon, Left, ModeWrapper, NotificationWrapper, Right, Title, UserWrapper, Wrapper, ToggleButtonWrapper, Paper, NotificationWrapperBox, NBox, NInner, NTop, NMiddle, NBottom, NLeft, NRight, MLeft, MRight, MLWrapper, MLFigure, MLImage, MRText, MRPaper } from '../style/header/Style'; // Adjust import path to your style file
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

  const toggleNotification = () => {
    setIsNotificationOpen(prevState => !prevState); // Toggle notification visibility
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
          <NotificationWrapper onClick={toggleNotification}>
            <Icon><NotificationsIcon /></Icon>
            {/* <NotificationWrapperBox>
              {isNotificationOpen && (
                <NBox>
                  <NInner>
                    <NTop>
                      <NLeft>
                      <strong>Notifications </strong>
                      <span>(03)</span>
                      </NLeft>
                      <NRight>
                        <strong>Clear All</strong>
                      </NRight>
                    </NTop>

                    <NMiddle>
                      <MLeft>
                        <MLWrapper>
                          <div className='left'>
                            <ErrorOutlineIcon />
                          </div>
                          <div className='right'>
                            <MRText>A new user added in Daxa </MRText>
                            <MRPaper> 3 hrs ago </MRPaper>
                          </div>
                        </MLWrapper>
                      </MLeft>
                      <MRight>

                      </MRight>
                    </NMiddle>

                    <NMiddle>
                      <MLeft>
                        <MLWrapper>
                          <div className='left'>
                            <ErrorOutlineIcon />
                          </div>
                          <div className='right'>
                            <MRText>A new user added in Daxa </MRText>
                            <MRPaper> 3 hrs ago </MRPaper>
                          </div>
                        </MLWrapper>
                      </MLeft>
                      <MRight>

                      </MRight>
                    </NMiddle>


                    <NBottom></NBottom>
                  </NInner>
                </NBox>
              )}
            </NotificationWrapperBox> */}
          </NotificationWrapper>
          <ExpandWrapper onClick={toggleFullScreen}>
            <AllOutIcon />
          </ExpandWrapper>
          <UserWrapper theme={theme}>
            <AccountCircleIcon style={{ fontSize: '48px' }} />
          </UserWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
