// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, FileText, Heart, Mail, BarChart, CreditCard, UserCircle, LogOut } from 'lucide-react';
import { SidebarContainer, Logo, NavSection, NavSectionTitle, NavItem } from '../Style/SideBar/Style';
import LogoImage from '../assets/logo.jpg';
import { FaDisease } from "react-icons/fa6";
import { RiLiveFill } from "react-icons/ri";
import { GiArtificialHive } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <SidebarContainer>
      <Logo>
        <img src={LogoImage} alt='logo' width={25} />
        Bee-Keeping
      </Logo>

      <NavSection>
        <NavSectionTitle>Main</NavSectionTitle>
        <NavItem onClick={() => navigate('/dashboard')}>
          <MdDashboard size={20} />
          Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/proposals')}>
          <GiArtificialHive size={20} />
          AI Model
        </NavItem>
        <NavItem onClick={() => navigate('/saved')}>
          
          <FaDisease size={20} />
          Diseases
        </NavItem>
        <NavItem onClick={() => navigate('/streaming')}>
          <RiLiveFill size={20} />
          Live Streaming
        </NavItem>
      </NavSection>

      <NavSection>
        <NavSectionTitle>Finance</NavSectionTitle>
        <NavItem onClick={() => navigate('/reviews')}>
          <BarChart size={20} />
          Reviews
        </NavItem>
        <NavItem onClick={() => navigate('/invoices')}>
          <CreditCard size={20} />
          Invoices
        </NavItem>
      </NavSection>

      <NavSection>
        <NavSectionTitle>Settings</NavSectionTitle>
        <NavItem onClick={() => navigate('/profile')}>
          <UserCircle size={20} />
          My Profile
        </NavItem>
        <NavItem onClick={() => navigate('/logout')}>
          <LogOut size={20} />
          Logout
        </NavItem>
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar;
