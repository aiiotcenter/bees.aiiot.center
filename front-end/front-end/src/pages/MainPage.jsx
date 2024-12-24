// HomePage.js
import React, { useState } from 'react';
import Layout from '../components/Layout';  // The Layout component (includes sidebar and header)
import SideBar from '../components/SideBar';
import HivePage from './HivePage';
import LivePage from './LivePage';
import Box from '../components/Box';
import MissingPage from './MissingPage';
import AiModel from '../components/AIModel/AiModel';

const MainPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('LivePage'); // Default selected component

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle menu item clicks to change the content
  const handleMenuClick = (component) => {
    setSelectedComponent(component); // Change the selected component
  };

  // Dynamically render content based on selected component
  const renderContent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <MainPage />;
      case 'hive':
        return <MissingPage />;
      case 'bee':
        return <MissingPage />;
      case 'disease':
        return <MissingPage />;
      case 'weight':
        return <MissingPage />;
      case 'live':
        return <LivePage />;
      case 'model':
        return <AiModel />;  
      default:
        return <HivePage />; 
    }
  };

  return (
    <Layout>
      <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} onMenuClick={handleMenuClick} />
        {renderContent()}
    </Layout>
  );
};

export default MainPage;
