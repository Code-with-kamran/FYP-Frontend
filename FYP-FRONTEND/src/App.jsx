import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import RoleManagement from './pages/RoleManagement';
import RecruiterProfile from './pages/RecruiterProfile';
import CandidateProfile from './pages/CandidateProfile';
import CVUpload from './pages/CVUpload';
import JobsPage from './pages/JobsPage';
import Login from './pages/Login'; // Assuming Login exists or will be created, keeping it safe
import Register from './pages/Register'; // Assuming Register exists or will be created, keeping it safe
import ForgotPassword from './pages/ForgotPassword'; // Assuming Register exists or will be created, keeping it safe
import ResetPassword from './pages/ResetPassword'; // Assuming Register exists or will be created, keeping it safe
import JobDetailPage from './pages/JobDetailPage'; // Assuming Register exists or will be created, keeping it safe
import JobQuestionPage from './pages/JobQuestionPage'; // Assuming Register exists or will be created, keeping it safe
import { StyleSheetManager } from 'styled-components';


function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'grow' && prop !== 'allowOverflow' && prop !== 'button'}>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobspage" element={<JobsPage />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="recruiter-profile" element={<RecruiterProfile />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route path="cv-upload" element={<CVUpload />} />
          <Route path="/jobDetails/:id" element={<JobDetailPage />} />   
          <Route path="job-questions" element={<JobQuestionPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Forgot-password" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
    </StyleSheetManager>
  );
}

export default App;
