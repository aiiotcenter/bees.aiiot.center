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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User authentication state

  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected Routes - Only Accessible if Logged In */}
        {isAuthenticated ? (
          <Route
            path="/*"
            element={
              <MainWrapper>
                <Sidebar />
                <Main>
                  <Header />
                  <Routes>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/proposals" element={<NotFound />} />
                    <Route path="/saved" element={<NotFound />} />
                    <Route path="/streaming" element={<Streaming />} />
                    <Route path="/reviews" element={<NotFound />} />
                    <Route path="/invoices" element={<NotFound />} />
                    <Route path="/payouts" element={<NotFound />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </Main>
              </MainWrapper>
            }
          />
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
