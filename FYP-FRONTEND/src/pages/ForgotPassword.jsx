// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import apiClient from '../Config/apiClient';
import { API_ENDPOINTS, themeColors } from '../Config/theme';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to send reset email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const emailIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  if (success) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle="Password reset link has been sent"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeColors.primary}20` }}>
            <svg className="w-8 h-8" style={{ color: themeColors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Please check your email and click the link to reset your password.
          </p>
          <div className="pt-4">
            <Link 
              to="/login"
              className="inline-block py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: themeColors.primary }}
            >
              Back to Sign In
            </Link>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="text-sm hover:underline"
            style={{ color: themeColors.primary }}
          >
            Resend email
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password?" 
      subtitle="Enter your email to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="Enter your email"
          error={error}
          icon={emailIcon}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: themeColors.primary }}
          onMouseOver={(e) => e.target.style.backgroundColor = themeColors.primaryHover}
          onMouseOut={(e) => e.target.style.backgroundColor = themeColors.primary}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </button>

        <p className="text-center text-gray-600 text-sm">
          Remember your password?{' '}
          <Link 
            to="/login" 
            className="font-semibold hover:underline"
            style={{ color: themeColors.primary }}
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
