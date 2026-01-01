import React, { useState, useEffect } from 'react';
import {
    FaUsers, FaFileAlt, FaVideo, FaTrophy,
    FaClipboardCheck, FaBriefcase, FaBullseye, FaClock,
    FaUserPlus, FaCalendarCheck
} from 'react-icons/fa';
import MetricCard from '../components/MetricCard';
import WelcomeBanner from '../components/WelcomeBanner';
import Skeleton from '../components/Skeleton';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Only 8 Key Metrics
    const keyMetrics = [
        { title: 'Total Applications', value: '1,234', icon: <FaFileAlt className="text-xl" />, change: '12.5', changeType: 'positive', color: 'primary' },
        { title: 'Total Candidates', value: '987', icon: <FaUsers className="text-xl" />, change: '8.2', changeType: 'positive', color: 'info' },
        { title: 'Interviews Conducted', value: '489', icon: <FaVideo className="text-xl" />, change: '18.3', changeType: 'positive', color: 'purple' },
        { title: 'Successful Hires', value: '89', icon: <FaTrophy className="text-xl" />, change: '22.1', changeType: 'positive', color: 'success' },
        { title: 'Pending Reviews', value: '124', icon: <FaClipboardCheck className="text-xl" />, change: '5.7', changeType: 'positive', color: 'warning' },
        { title: 'Active Job Postings', value: '45', icon: <FaBriefcase className="text-xl" />, change: '3.2', changeType: 'positive', color: 'success' },
        { title: 'Avg Confidence Score', value: '7.8/10', icon: <FaBullseye className="text-xl" />, change: '4.2', changeType: 'positive', color: 'info' },
        { title: 'Time to Hire', value: '23 days', icon: <FaClock className="text-xl" />, change: '8.1', changeType: 'negative', color: 'danger' },
    ];

    // Recent Activity
    const recentInterviews = [
        { candidate: 'John Smith', role: 'Senior Developer', time: '2 hours ago', status: 'Completed' },
        { candidate: 'Sarah Johnson', role: 'UX Designer', time: '5 hours ago', status: 'In Progress' },
        { candidate: 'Michael Chen', role: 'Data Analyst', time: '1 day ago', status: 'Completed' },
    ];

    const todaySchedule = [
        { candidate: 'Emma Wilson', role: 'Product Manager', time: '10:00 AM', color: 'blue' },
        { candidate: 'David Martinez', role: 'Full Stack Developer', time: '2:30 PM', color: 'purple' },
        { candidate: 'Lisa Anderson', role: 'Marketing Specialist', time: '4:00 PM', color: 'green' },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Skeleton key={i} className="h-40 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <WelcomeBanner userName="Admin" />

            {/* Key Metrics - 8 Cards Only */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyMetrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            title={metric.title}
                            value={metric.value}
                            icon={metric.icon}
                            change={metric.change}
                            changeType={metric.changeType}
                            color={metric.color}
                        />
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Interviews */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <FaVideo className="mr-2 text-purple-500" />
                        Latest Interviews
                    </h3>
                    <div className="space-y-4">
                        {recentInterviews.map((interview, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{interview.candidate}</p>
                                        <p className="text-sm text-gray-500">{interview.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${interview.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {interview.status}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{interview.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today's Scheduled */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <FaCalendarCheck className="mr-2 text-blue-500" />
                        Today's Schedule
                    </h3>
                    <div className="space-y-4">
                        {todaySchedule.map((item, index) => (
                            <div key={index} className={`flex items-center justify-between p-4 bg-${item.color}-50 rounded-lg border-l-4 border-${item.color}-500`}>
                                <div>
                                    <p className="font-medium text-gray-800">{item.candidate}</p>
                                    <p className="text-sm text-gray-600">{item.role} - {item.time}</p>
                                </div>
                                <FaUserPlus className={`text-${item.color}-500 text-xl`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
