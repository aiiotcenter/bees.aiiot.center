// src/components/header/Header.js
import React from 'react';
import { Bell, Mail, Heart, Search } from 'lucide-react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const SearchBar = styled.div`
  flex: 1;
  margin: 0 40px;
  position: relative;

  input {
    width: 100%;
    padding: 12px 40px;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 14px;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Header = ({ activeComponent }) => {
  return (
    <HeaderContainer>
      <h1>Dashboard</h1>
      <SearchBar>
        <Search size={20} style={{ position: "absolute", left: 12, top: 12, color: "#666" }} />
        <input type="text" placeholder="What service are you looking for today?" />
      </SearchBar>
      <UserActions>
        <Bell size={20} />
        <Mail size={20} />
        <Heart size={20} />
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Profile" />
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;
