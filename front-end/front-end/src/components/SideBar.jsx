// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, FileText, Heart, Mail, BarChart, CreditCard, UserCircle, LogOut } from 'lucide-react';
import { SidebarContainer, Logo, NavSection, NavSectionTitle, NavItem } from '../Style/SideBar/Style';
import LogoImage from '../assets/logo.jpg';

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
          <BarChart2 size={20} />
          Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/proposals')}>
          <FileText size={20} />
          My Proposals
        </NavItem>
        <NavItem onClick={() => navigate('/saved')}>
          <Heart size={20} />
          Saved
        </NavItem>
        <NavItem onClick={() => navigate('/messages')}>
          <Mail size={20} />
          Messages
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
        <NavSectionTitle>Account</NavSectionTitle>
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
