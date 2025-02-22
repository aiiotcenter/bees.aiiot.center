// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { BarChart2, FileText, Heart, Mail, BarChart, FileText as FileInvoice, CreditCard, UserCircle, LogOut } from 'lucide-react';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import { Main, MainWrapper } from './Style/GlobalStyle';
import '../src/App.css';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Streaming from './components/Streaming.jsx/Streaming';
import NotFound from './components/404';

function App() {
  return (
    <Router>
      <MainWrapper>
        <Sidebar />
        <Main>
          <Header />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/proposals" element={<NotFound/>} />
            <Route path="/saved" element={<NotFound/>} />
            <Route path="/streaming" element={<Streaming/>} />
            <Route path="/reviews" element={<NotFound/>} />
            <Route path="/invoices" element={<NotFound/>} />
            <Route path="/payouts" element={<NotFound/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<NotFound/>} />
            <Route path="/404" element={<NotFound/>} />
          </Routes>
          <Footer/>
        </Main>
      </MainWrapper>
    </Router>
  );
}

export default App;
