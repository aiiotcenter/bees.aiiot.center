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
            <Route path="/proposals" element={<h2>My Proposals Page</h2>} />
            <Route path="/saved" element={<h2>Saved Page</h2>} />
            <Route path="/messages" element={<h2>Messages Page</h2>} />
            <Route path="/reviews" element={<h2>Reviews Page</h2>} />
            <Route path="/invoices" element={<h2>Invoices Page</h2>} />
            <Route path="/payouts" element={<h2>Payouts Page</h2>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<h2>Logging Out...</h2>} />
          </Routes>
          <Footer/>
        </Main>
      </MainWrapper>
    </Router>
  );
}

export default App;
