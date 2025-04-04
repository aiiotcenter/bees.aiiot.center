import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

// Styled Components
const SidebarContainer = styled.div`
  width: 100%;
  max-width: 170px;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  position: fixed;
  top: 70px;
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
  transition: 0.2s ease all;

  &:hover {
    background: #78091e;
    color: #fff;
  }

  &.active {
    background: #78091e;
    color: #fff;
  }

  svg {
    margin-right: 10px;
  }
`;

const SideBar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  // Detect outside clicks to close the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose(); // Close the sidebar
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      <MenuSection>
        <MenuItem as={NavLink} to="/profile">
          <FaUser /> My Profile
        </MenuItem>
        <MenuItem>
          <FaSignOutAlt
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.href = "/";
            }}
          />{" "}
          Logout
        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default SideBar;
