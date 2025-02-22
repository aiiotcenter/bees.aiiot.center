import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaHeart, FaEnvelope, FaStar, FaFileInvoice, FaMoneyCheck, FaFileAlt, FaCog, FaBriefcase, FaProjectDiagram, FaUser, FaSignOutAlt } from "react-icons/fa";

// Styled Components
const SidebarContainer = styled.div`
  width: 100%;
  max-width: 170px;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  position: fixed;
  top: 70px; /* Positioned below the header */
  transform: translate(-50%, ${({ isOpen }) => (isOpen ? "0" : "-10px")}) scale(${({ isOpen }) => (isOpen ? "1" : "0.95")});
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  box-shadow: ${({ isOpen }) => (isOpen ? "0 5px 20px rgba(0,0,0,0.2)" : "none")};
  z-index: 1000;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  right: -100px;
`;

const MenuSection = styled.div`
  margin-bottom: 0px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  border-radius: 5px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f4f4f4;
  }

  &.active {
    background: #000;
    color: #fff;
  }

  svg {
    margin-right: 10px;
  }
`;

const SideBar = ({ isOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen}>




      <MenuSection>
        <MenuItem as={NavLink} to="/profile" className="active">
          <FaUser/> My Profile
        </MenuItem>
        <MenuItem>
        <FaSignOutAlt 
  style={{ cursor: "pointer" }} 
  onClick={() => {
    localStorage.removeItem("isAuthenticated"); // Remove auth state
    window.location.href = "/"; // Redirect to login
  }} 
/> Logout

        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default SideBar;
