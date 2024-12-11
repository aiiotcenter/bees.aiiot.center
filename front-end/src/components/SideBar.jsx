import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for routing
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HiveIcon from '@mui/icons-material/Hive';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ScaleIcon from '@mui/icons-material/Scale';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import Logo from '../assets/images/neu-logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Figure, Image, SidebarContainer, SideBarHeader, SidebarItem, SidebarWrapper, Toggle, Paper } from '../style/sidebar/SideBar';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Header from './Header';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const SideBar = ({ onMenuClick }) => {
  const { theme } = useTheme(); // Get the current theme
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle the toggle of the sidebar (collapsed or expanded)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>

      <Header isCollapsed={isCollapsed} />

      <SidebarContainer style={{ width: isCollapsed ? '60px' : '260px', alignItems: isCollapsed ? 'center' : 'flex-start', gap: isCollapsed ? '15px' : '0' }}  theme={theme}>
        <SideBarHeader  theme={theme}>
          <Figure style={{ display: isCollapsed ? 'none' : 'block' }}>
            <Image src={Logo} alt='Logo' width={200} height={200} />
          </Figure>
          <Toggle onClick={toggleSidebar}  theme={theme}><MenuIcon /></Toggle>
        </SideBarHeader>

        <SidebarWrapper onClick={() => onMenuClick('hivePage')} style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><HomeIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Dashboard</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

        <SidebarWrapper onClick={() => onMenuClick('hivePage')} style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><HiveIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Hive</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

        <SidebarWrapper onClick={() => onMenuClick('bee')} style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><EmojiNatureIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Bee</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

        <SidebarWrapper style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><CoronavirusIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Diseases</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

        <SidebarWrapper style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><ScaleIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Weight</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

        <SidebarWrapper onClick={() => onMenuClick('live')} style={{ padding: isCollapsed ? '15px 15px' : '15px' }}  theme={theme}>
          <SidebarItem><SlideshowIcon sx={{ fontSize: 15 }} /><Paper style={{ display: isCollapsed ? 'none' : 'flex' }}  theme={theme}>Live</Paper></SidebarItem><ArrowForwardIosIcon sx={{ fontSize: 15 }} style={{ display: isCollapsed ? 'none' : 'flex' }} />
        </SidebarWrapper>

      </SidebarContainer>
    </>
  );
};

export default SideBar;
