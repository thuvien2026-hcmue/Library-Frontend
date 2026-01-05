import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeModeProvider } from './context/ThemeContext'
import { ToastProvider } from "./context/ToastContext";
import { HelmetProvider } from "react-helmet-async";
import "./index.css"


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeModeProvider>
      </ToastProvider>
    </HelmetProvider>
  </React.StrictMode>
);
