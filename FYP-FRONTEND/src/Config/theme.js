// src/config/theme.js

// CSS variables are defined in index.css
// These are just for JS usage
export const themeColors = {
  primary: '#1960C8',
  primaryHover: '#EA580C',
  secondary: '#FB923C',
  lightBg: '#FED7AA',
};

export const API_BASE_URL = 'https://localhost:7103/api';

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  ME:'Candidates/me',
  JOBS_LIST: '/Jobs',              // GET list
  JOBS_CREATE: '/Jobs/create-simple', // POST create
  JOBS_UPDATE: (id) => `/Jobs/${id}`,
  JOBS_DELETE: (id) => `/Jobs/${id}`, // DELETE
  JOBS_STATUS: (id) => `/Jobs/${id}/status`,
  FULL_JOBS_DETAIL: (id) => `/Jobs/get-full/${id}` ,
  USERS_LIST: '/Users',           // GET
  USERS_CREATE: '/Users',  // POST (Your specific payload)
  USERS_UPDATE: (id) => `/Users/${id}`,
  USERS_DELETE: (id) => `/Users/${id}`,
  USERS_STATUS: (id) => `/Users/${id}/status`,
};
