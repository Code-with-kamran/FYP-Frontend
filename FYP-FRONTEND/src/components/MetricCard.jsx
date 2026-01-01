import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const MetricCard = ({
    title,
    value,
    icon,
    change,
    changeType = 'positive',
    color = 'primary',
    bgPattern = true
}) => {
    const colorClasses = {
        primary: {
            bg: 'bg-blue-500',
            lightBg: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-100',
            iconBg: 'bg-blue-500'
        },
        success: {
            bg: 'bg-green-500',
            lightBg: 'bg-green-50',
            text: 'text-green-600',
            border: 'border-green-100',
            iconBg: 'bg-green-500'
        },
        warning: {
            bg: 'bg-yellow-500',
            lightBg: 'bg-yellow-50',
            text: 'text-yellow-600',
            border: 'border-yellow-100',
            iconBg: 'bg-yellow-500'
        },
        danger: {
            bg: 'bg-red-500',
            lightBg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-100',
            iconBg: 'bg-red-500'
        },
        info: {
            bg: 'bg-cyan-500',
            lightBg: 'bg-cyan-50',
            text: 'text-cyan-600',
            border: 'border-cyan-100',
            iconBg: 'bg-cyan-500'
        },
        purple: {
            bg: 'bg-purple-500',
            lightBg: 'bg-purple-50',
            text: 'text-purple-600',
            border: 'border-purple-100',
            iconBg: 'bg-purple-500'
        }
    };

    const colors = colorClasses[color] || colorClasses.primary;

    return (
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 z-10">
            <div className="p-6">
                <div className="flex items-center justify-between border-b border-gray-100 mb-3 pb-3">
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
                        <h6 className="text-2xl font-bold text-gray-800">{value}</h6>
                    </div>
                    <span className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center text-white shadow-sm transition-transform duration-300 hover:scale-110`}>
                        {icon}
                    </span>
                </div>
                {change && (
                    <p className="text-sm flex items-center">
                        <span className={`inline-flex items-center font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                            {changeType === 'positive' ? (
                                <FaArrowUp className="mr-1 text-xs" />
                            ) : (
                                <FaArrowDown className="mr-1 text-xs" />
                            )}
                            {change}%
                        </span>
                        <span className="text-gray-500 ml-1">from last month</span>
                    </p>
                )}
            </div>

            {/* Background Pattern */}
            {bgPattern && (
                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="90" cy="90" r="60" fill="currentColor" className={colors.text} />
                        <circle cx="30" cy="110" r="40" fill="currentColor" className={colors.text} />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default MetricCard;
