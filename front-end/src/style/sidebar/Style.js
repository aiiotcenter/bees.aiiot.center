// src/styles/SidebarStyles.js
import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 350px;
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 0px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
`;

export const NavSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: normal;
  justify-content: center;
  flex-direction: column;
`;

export const NavSectionTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #6B7177;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 20px;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 30px;
  color: #495057;
  text-decoration: none;
  cursor: pointer;
  max-height: 55px;
  transition: 0.3s ease all;
  &:hover{
    background-color: #222222;
    color: #fff;
  }

  &.active {
    background-color: #222222;
    color: #fff;
   
  }
`;
