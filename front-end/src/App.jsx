// Install dependencies if you haven't already:
// npm install amazon-cognito-identity-js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";
import { Main, MainWrapper } from "./Style/GlobalStyle";
import "../src/App.css";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Streaming from "./components/Streaming.jsx/Streaming";
import NotFound from "./components/404";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AIModel from "./components/AIModel";
import Table from "./components/Table";

const userPool = new CognitoUserPool({
  UserPoolId: "eu-west-2_K6L5O2HfY",
  ClientId: "4njc2pp1cpfi7ecmspudfvggf4",
});

const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <MainWrapper>
      {!hideSidebar && <Sidebar />}
      <Main>
        {!hideSidebar && <Header />}
        <Outlet />
        {!hideSidebar && <Footer />}
      </Main>
    </MainWrapper>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (!err && session.isValid()) {
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        {isAuthenticated ? (
          <Route element={<Layout />}>
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
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
