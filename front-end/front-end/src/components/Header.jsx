// src/components/header/Header.js
import React from 'react';
import { Bell, Mail, Heart, Search } from 'lucide-react';
import SideBarIcon from '../assets/sidebar-control.jpg'
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 0px;
  background: white;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: fixed;
  z-index: 999;
  box-sizing: border-box;
  width: -webkit-fill-available;
`;

const SideBarControl = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  img {

  }
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  margin: 0px;
  position: relative;
  max-width: 628px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 40px;
  

  input {
    max-width: 540px;
    width: 100%;
    padding: 16px 18px;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.3s ease all;
    /* height: 50px; */
    &::placeholder{
      color: #6B7177;
      font-size: 15px;
    }
    &:hover{
      border-color: #1F4B3F;
    }
    &:focus{
      outline: none;
      border-color: #1F4B3F;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    transition: 0.3s ease all;
    &:hover{
      cursor: pointer;
    }
  }
`;

const Paper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease all;
  &:hover{
    cursor: pointer;
  }

  /* img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  } */
`;

const Header = ({ activeComponent }) => {
  return (
    <HeaderContainer>

      <SearchBarWrapper>
        <SideBarControl>
          <img src={SideBarIcon} alt='Icon' height={20} width={18} />
        </SideBarControl>
        <Search size={20} style={{ position: "absolute", right: 16, top: 14, color: "#666" }} />
        <input type="text" placeholder="What service are you looking for today?" />
      </SearchBarWrapper>
      <UserActions>
        <Paper>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0547 10.268V8.39844C16.0547 5.67102 14.2417 3.35934 11.7578 2.6043V1.75781C11.7578 0.788555 10.9692 0 9.99998 0C9.03073 0 8.24217 0.788555 8.24217 1.75781V2.6043C5.75819 3.35934 3.9453 5.67098 3.9453 8.39844V10.268C3.9453 12.6638 3.03209 14.9355 1.37393 16.6648C1.21143 16.8342 1.16577 17.0843 1.25788 17.3002C1.34998 17.5161 1.56209 17.6562 1.79686 17.6562H7.12924C7.40143 18.9919 8.58518 20 9.99998 20C11.4148 20 12.5985 18.9919 12.8707 17.6562H18.2031C18.4379 17.6562 18.6499 17.5161 18.7421 17.3002C18.8342 17.0843 18.7885 16.8342 18.626 16.6648C16.9679 14.9355 16.0547 12.6638 16.0547 10.268ZM9.41405 1.75781C9.41405 1.43473 9.6769 1.17188 9.99998 1.17188C10.3231 1.17188 10.5859 1.43473 10.5859 1.75781V2.37219C10.3931 2.35359 10.1976 2.34375 9.99998 2.34375C9.80233 2.34375 9.6069 2.35359 9.41405 2.37219V1.75781ZM9.99998 18.8281C9.23612 18.8281 8.58483 18.3382 8.34295 17.6562H11.657C11.4151 18.3382 10.7639 18.8281 9.99998 18.8281ZM3.05975 16.4844C4.39416 14.6956 5.11717 12.5309 5.11717 10.268V8.39844C5.11717 5.70605 7.3076 3.51562 9.99998 3.51562C12.6924 3.51562 14.8828 5.70605 14.8828 8.39844V10.268C14.8828 12.5309 15.6058 14.6956 16.9403 16.4844H3.05975Z" fill="#1F4B3F" />
            <path d="M17.6172 8.39841C17.6172 8.72201 17.8795 8.98435 18.2031 8.98435C18.5267 8.98435 18.7891 8.72201 18.7891 8.39841C18.7891 6.05076 17.8748 3.84361 16.2148 2.18357C15.986 1.95478 15.615 1.95474 15.3862 2.18357C15.1573 2.4124 15.1573 2.78337 15.3862 3.0122C16.8249 4.45091 17.6172 6.36376 17.6172 8.39841Z" fill="#1F4B3F" />
            <path d="M1.79688 8.98439C2.12047 8.98439 2.38281 8.72204 2.38281 8.39845C2.38281 6.36384 3.17516 4.45099 4.61383 3.01228C4.84266 2.78345 4.84266 2.41247 4.61383 2.18365C4.38504 1.95482 4.01402 1.95482 3.7852 2.18365C2.12516 3.84368 1.21094 6.05079 1.21094 8.39845C1.21094 8.72204 1.47328 8.98439 1.79688 8.98439Z" fill="#1F4B3F" />
          </svg>
        </Paper>
        <Paper>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4773 2.84101L10.0007 8.5482L3.52269 2.84093C3.26475 2.61368 2.87157 2.63866 2.64441 2.89643C2.41733 3.15429 2.44205 3.54747 2.7 3.77472L9.58946 9.84447C9.70702 9.94801 9.85395 9.99978 10.0008 9.99978C10.1477 9.99978 10.2947 9.94801 10.4122 9.84438L17.3003 3.77463C17.5581 3.54747 17.5829 3.15421 17.3557 2.89635C17.1284 2.63874 16.7353 2.61385 16.4773 2.84101Z" fill="#1F4B3F" />
            <path d="M18.1333 0.196594H1.86675C0.837464 0.196594 0 1.03398 0 2.06334V11.9365C0 12.9659 0.837464 13.8033 1.86675 13.8033H18.1333C19.1625 13.8033 20 12.9659 20 11.9365V2.06334C20 1.03406 19.1625 0.196594 18.1333 0.196594ZM18.7555 11.9365C18.7555 12.2796 18.4764 12.5588 18.1333 12.5588H1.86675C1.5236 12.5588 1.2445 12.2796 1.2445 11.9365V2.06334C1.2445 1.72027 1.5236 1.44109 1.86675 1.44109H18.1333C18.4764 1.44109 18.7555 1.72027 18.7555 2.06334V11.9365Z" fill="#1F4B3F" />
          </svg>
        </Paper>
        <Paper>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.55499 18.98C9.67249 19.1 9.83249 19.1667 9.99999 19.1667C10.1675 19.1667 10.3275 19.1 10.445 18.98L18.44 10.8792C20.5158 8.77669 20.5158 5.35419 18.44 3.25085C17.4317 2.22919 16.0908 1.66669 14.6633 1.66669C13.2358 1.66669 11.8958 2.22919 10.8875 3.25002L9.99999 4.15002L9.11249 3.25085C8.10416 2.22919 6.76332 1.66669 5.33666 1.66669C3.90916 1.66669 2.56832 2.22919 1.55999 3.25085C-0.515846 5.35419 -0.515846 8.77669 1.55999 10.8784L9.55499 18.98ZM2.44916 4.12835C3.22082 3.34752 4.24666 2.91669 5.33582 2.91669C6.42582 2.91669 7.45082 3.34752 8.22166 4.12919L9.55416 5.47919C9.78833 5.71669 10.2092 5.71669 10.4433 5.47919L11.7758 4.12835C12.5492 3.34752 13.5742 2.91669 14.6633 2.91669C15.7533 2.91669 16.7783 3.34752 17.55 4.12835C19.1475 5.74752 19.1475 8.38169 17.55 10.0017L9.99999 17.6525L2.44916 10.0009C0.851655 8.38252 0.851655 5.74752 2.44916 4.12835Z" fill="#1F4B3F" />
          </svg>
        </Paper>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Profile" />
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;
