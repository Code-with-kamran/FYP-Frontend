import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUserTie, FaUser, FaSignOutAlt, FaBars, FaTimes, FaBriefcase,FaQuestionCircle } from 'react-icons/fa';

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState({ fullName: 'Guest', email: '', avatar: null });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          fullName: parsedUser.fullName || parsedUser.FullName || 'User',
          email: parsedUser.email || parsedUser.Email || '',
          avatar: parsedUser.avatar || null 
        });
      } catch (e) { console.error(e); }
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/jobspage', icon: FaBriefcase, label: 'Post Job' },
    { path: '/roles', icon: FaUsers, label: 'Role Management' },
    { path: '/recruiter-profile', icon: FaUserTie, label: 'Recruiter Profile' },
    { path: '/candidate-profile', icon: FaUser, label: 'Candidate Profile' },
    { path: '/job-questions', icon: FaQuestionCircle, label: 'Job Questions' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - FIXED & EXPANDABLE */}
      {/* 'group' class is CRITICAL here for hover effects */}
      <aside className={`
        group fixed inset-y-0 left-0 z-50 bg-white shadow-xl flex flex-col transition-all duration-300 ease-in-out
        w-64                             /* Mobile: Default Open Width */
        md:w-20 md:hover:w-64            /* Tablet: Closed (20) -> Open on Hover (64) */
        lg:w-64                          /* Desktop: Always Fixed Open */
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 md:px-0 lg:px-6 border-b border-gray-100 
                        md:justify-center md:group-hover:justify-start lg:justify-start overflow-hidden">
          
          <div className="flex items-center space-x-3 min-w-max md:px-4 lg:px-0">
            {/* Logo Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white bg-primary">
              <FaUserTie className="text-xl" />
            </div>
            
            {/* Logo Text: Hidden on Tablet (md), Visible on Hover (md:group-hover), Always Visible Desktop (lg) */}
            <h1 className="text-xl font-bold text-primary whitespace-nowrap
                           md:hidden md:group-hover:block lg:block">
              JobPortal
            </h1>
          </div>

          <button onClick={toggleSidebar} className="md:hidden text-gray-500">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center px-3 py-3 rounded-xl transition-all duration-200 whitespace-nowrap relative
                  ${isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:bg-orange-50 hover:text-primary'}
                `}
              >
                {/* Icon */}
                <item.icon className={`text-xl flex-shrink-0 min-w-[20px] 
                  ${isActive ? 'text-white' : 'text-gray-400 group-hover/link:text-primary'}
                `} />
                
                {/* Label: Hidden on Tablet, Visible on Hover */}
                <span className={`
                  ml-3 font-medium transition-all duration-200
                  md:hidden md:group-hover:block lg:block
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 overflow-hidden">
          <Link
            to="/login"
            className="flex items-center px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            <FaSignOutAlt className="text-xl flex-shrink-0 min-w-[20px]" />
            <span className="ml-3 font-medium md:hidden md:group-hover:block lg:block">
              Logout
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-20 lg:pl-64 transition-all duration-300">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 text-gray-500 md:hidden">
              <FaBars className="text-xl" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-3 focus:outline-none"
            >
               <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">{user.fullName}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
              <div className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md overflow-hidden bg-primary ring-2 ring-transparent hover:ring-primary transition-all">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-lg">{user.fullName.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-fadeIn">
                 <Link to="/recruiter-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                 <Link to="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</Link>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
