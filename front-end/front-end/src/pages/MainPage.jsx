import React, { useState } from 'react';
import Layout from '../components/Layout';  // The Layout component (includes sidebar and header)
import SideBar from '../components/SideBar';
import HivePage from './HivePage';
import LivePage from './LivePage';
import Box from '../components/Box';
import MissingPage from './MissingPage';
import AiModel from '../components/AIModel/AiModel';
import { Wrapper } from '../style/common/style';
import Swarm from './SwarmPage';
import SwarmPage from './SwarmPage';
import BeePage from '../pages/BeePage'

const MainPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Track sidebar state
  const [selectedComponent, setSelectedComponent] = useState('LivePage'); // Default selected component

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle sidebar state
  };

  // Handle menu item clicks to change the content
  const handleMenuClick = (component) => {
    setSelectedComponent(component); // Change the selected component
  };

  // Dynamically render content based on selected component
  const renderContent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <HivePage />;
      case 'hive':
        return <HivePage />;
      case 'bee':
        return <BeePage />;
      case 'disease':
        return <MissingPage />;
      case 'weight':
        return <MissingPage />;
      case 'live':
        return <LivePage />;
      case 'model':
        return <AiModel />;
      case 'swarm':
        return <SwarmPage />;
      default:
        return <HivePage />;
    }
  };

  return (
    <Layout>
      <SideBar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        onMenuClick={handleMenuClick} 
      />
      <Wrapper className={isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}>
        {renderContent()}
      </Wrapper>
    </Layout>
  );
};

export default MainPage;
