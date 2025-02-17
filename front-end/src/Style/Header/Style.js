import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled.header`
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

  .profile.icon {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const SideBarControl = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.3s ease all;
  &:hover{
    cursor: pointer;
  }
`;

export const SearchBarWrapper = styled.div`
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

    &::placeholder {
      color: #6B7177;
      font-size: 15px;
    }

    &:hover {
      border-color: #1F4B3F;
    }

    &:focus {
      outline: none;
      border-color: #1F4B3F;
    }
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    transition: 0.3s ease all;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Paper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease all;

  &:hover {
    cursor: pointer;
  }
`;

export const NotificationContainer = styled.div`
  position: relative;
`;

export const NotificationBox = styled(motion.div)`
  position: absolute;
  right: -15px;
  width: 360px;
  padding: 1rem;
  top: -162px !important;
`;

export const NotificationIconStyled = styled(Paper)`
  cursor: pointer;
`;
