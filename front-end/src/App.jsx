import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import { Main, MainWrapper } from './Style/GlobalStyle';
import '../src/App.css';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Streaming from './components/Streaming.jsx/Streaming';
import NotFound from './components/404';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AIModel from './components/AIModel';
import Table from './components/Table';

// ✅ Layout component with Sidebar & Header
const Layout = () => {
  const location = useLocation();

  // Hide sidebar for login/signup pages
  const hideSidebar = location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <MainWrapper>
      {!hideSidebar && <Sidebar />} {/* Show sidebar only for authenticated routes */}
      <Main>
        {!hideSidebar && <Header />}
        <Outlet />  {/* ✅ This renders child routes dynamically */}
        {!hideSidebar && <Footer />}
      </Main>
    </MainWrapper>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check authentication status on page load
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* ✅ Redirect Home Based on Authentication */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        {/* ✅ Protected Routes with Sidebar & Layout */}
        {isAuthenticated ? (
          <Route element={<Layout />}>  {/* ✅ This wraps all protected routes */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-modal" element={<AIModel />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/disease" element={<NotFound />} />
            <Route path="/detail" element={<Table />} />
            <Route path="/logout" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          // Redirect unknown routes to login when unauthenticated
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
