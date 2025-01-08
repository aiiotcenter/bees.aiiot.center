// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);  // Returns theme and toggleTheme
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default theme is light

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme to the document body (for global styles)
  useEffect(() => {
    document.body.className = theme;  // Set the class on the body element
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}  {/* Wrapping children components with the provider */}
    </ThemeContext.Provider>
  );
};
