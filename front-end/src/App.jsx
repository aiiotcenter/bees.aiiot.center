import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import GlobalStyles from './style/common/GlobalStyles';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext'; // Use the ThemeContext provider

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  return (
    <ThemeProvider value={{ theme, toggleTheme }}> {/* Use the context provider here */}
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
