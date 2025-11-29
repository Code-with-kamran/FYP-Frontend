// src/components/AuthLayout.jsx
import React from 'react';
import logo from "../assets/logo.png";
import AuthenticationImg from "../assets/authentication-bg-01.png";



const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-white/15"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md space-y-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <h1 className="text-4xl font-bold mb-4">
                Empowering people through seamless HR management.
              </h1>
              
              <div className="my-8">
                <div className="bg-white/30 rounded-lg p-6 backdrop-blur-sm">
                  <img 
                    src={AuthenticationImg} 
                    alt="Team collaboration" 
                    className="w-full h-48 object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23fff" opacity="0.2" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="18" font-family="Arial"%3ETeam Collaboration%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </div>
              
              <p className="text-lg font-medium">
                Efficiently manage your workforce, streamline operations effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />

              </div>
              <span className="text-2xl font-bold text-gray-800">Interview Evaluator</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Copyright © 2025 - AI Powered virtual Interview Evaluator
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
