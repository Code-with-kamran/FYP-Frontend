import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const WelcomeBanner = ({ userName = "Admin User" }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="relative z-10 p-8">
                <div className="flex items-center justify-between">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold mb-2">
                            {getGreeting()}, {userName}!
                        </h1>
                        <p className="text-purple-100 text-lg mb-4">
                            Welcome to your Recruitment Dashboard
                        </p>
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <FaCalendarAlt className="mr-2" />
                                <span>{formatDate(currentTime)}</span>
                            </div>
                            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <FaClock className="mr-2" />
                                <span>{formatTime(currentTime)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Illustration/Icon */}
                    <div className="hidden md:block">
                        <div className="w-48 h-48 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        </div>
    );
};

export default WelcomeBanner;
