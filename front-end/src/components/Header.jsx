import React, { useState, useEffect, useRef } from "react";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import SideBarIcon from "../assets/sidebar-control.jpg";
import Notifications from "../../src/Sections/Notifications";
import SideBar from "./Header/SideBar";
import {
  HeaderContainer,
  SideBarControl,
  SearchBarWrapper,
  UserActions,
  NotificationContainer,
  NotificationBox,
  NotificationIconStyled,
} from "../Style/Header/Style";

const Header = ({ activeComponent }) => {
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const notificationRef = useRef(null);
  const sidebarRef = useRef(null);

  // Handle clicks outside of NotificationBox & Sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderContainer>
      <SearchBarWrapper>
        <SideBarControl>
          <img src={SideBarIcon} alt="Icon" height={20} width={18} />
        </SideBarControl>
        <Search
          size={20}
          style={{ position: "absolute", right: 16, top: 14, color: "#666" }}
        />
        <input type="text" placeholder="What service are you looking for today?" />
      </SearchBarWrapper>

      <UserActions>
        {/* NOTIFICATION ICON */}
        <NotificationContainer ref={notificationRef}>
          <NotificationIconStyled onClick={() => setOpen(!open)}>
            <Bell size={20} />
          </NotificationIconStyled>

          {/* NOTIFICATION DROPDOWN WITH ANIMATION */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationBox>
                <Notifications />
              </NotificationBox>
            </motion.div>
          )}
        </NotificationContainer>

        {/* PROFILE ICON / SIDEBAR TOGGLE */}
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
          alt="Profile"
          className="profile-icon"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />

        {/* SIDEBAR WITH SAME ANIMATION */}
        <motion.div
          ref={sidebarRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", right: 0, top: "70px", zIndex: 1000 }}
        >
          {isSidebarOpen && <SideBar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        </motion.div>
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;
