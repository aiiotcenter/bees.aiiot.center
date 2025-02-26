import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// ✅ Layout component for authenticated routes
function Layout({ children }) {
  return (
    <MainWrapper>
      <Sidebar />
      <Main>
        <Header />
        {children}
        <Footer />
      </Main>
    </MainWrapper>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Redirect Home to Login if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashBoard />
                </Layout>
              }
            />
            <Route
              path="/streaming"
              element={
                <Layout>
                  <Streaming />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            {/* Example of a placeholder for other pages */}
            <Route
              path="/proposals"
              element={
                <Layout>
                  <AIModel/>
                </Layout>
              }
            />
            <Route
              path="/saved"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
            <Route path="/logout" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          // Redirect all unknown routes to login
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
