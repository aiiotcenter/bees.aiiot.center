import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarContainer, Logo, NavSection, NavSectionTitle, NavItem } from '../Style/SideBar/Style';
import LogoImage from '../assets/logo.jpg';
import { MdDashboard } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { FaDisease } from "react-icons/fa6";
import { RiLiveFill } from "react-icons/ri";
import { BarChart, CreditCard, UserCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  return (
    <SidebarContainer>
      {/* Logo Section */}
      <Logo onClick={() => navigate('/dashboard')}>
        <img src={LogoImage} alt='Bee-Keeping Logo' width={25} />
        Bee-Keeping
      </Logo>

      {/* Main Section */}
      <NavSection>
        <NavSectionTitle>Main</NavSectionTitle>
        <NavItem 
          onClick={() => navigate('/dashboard')} 
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <MdDashboard size={20} /> Dashboard
        </NavItem>
        <NavItem 
          onClick={() => navigate('/ai-modal')} 
          className={location.pathname === "/proposals" ? "active" : ""}
        >
          <GiArtificialHive size={20} /> AI Model
        </NavItem>
        <NavItem 
          onClick={() => navigate('/not-found')} 
          className={location.pathname === "/saved" ? "active" : ""}
        >
          <FaDisease size={20} /> Diseases
        </NavItem>
        <NavItem 
          onClick={() => navigate('/streaming')} 
          className={location.pathname === "/streaming" ? "active" : ""}
        >
          <RiLiveFill size={20} /> Live Streaming
        </NavItem>
      </NavSection>

      {/* Finance Section */}
      <NavSection>
        <NavSectionTitle>Finance</NavSectionTitle>
        <NavItem 
          onClick={() => navigate('/reviews')} 
          className={location.pathname === "/reviews" ? "active" : ""}
        >
          <BarChart size={20} /> Reviews
        </NavItem>
        <NavItem 
          onClick={() => navigate('/invoices')} 
          className={location.pathname === "/invoices" ? "active" : ""}
        >
          <CreditCard size={20} /> Invoices
        </NavItem>
      </NavSection>

      {/* Settings Section */}
      <NavSection>
        <NavSectionTitle>Settings</NavSectionTitle>
        <NavItem 
          onClick={() => navigate('/profile')} 
          className={location.pathname === "/profile" ? "active" : ""}
        >
          <UserCircle size={20} /> My Profile
        </NavItem>
        <NavItem 
          onClick={() => navigate('/logout')} 
          className={location.pathname === "/logout" ? "active" : ""}
        >
          <LogOut size={20} /> Logout
        </NavItem>
       
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar;
