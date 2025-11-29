// src/config/theme.js

// CSS variables are defined in index.css
// These are just for JS usage
export const themeColors = {
  primary: '#1960C8',
  primaryHover: '#EA580C',
  secondary: '#FB923C',
  lightBg: '#FED7AA',
};

// Base URL for backend API
// ❌ OLD (causes error):
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7001/api';

// ✅ NEW (Vite syntax):
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7103/api';

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
};
