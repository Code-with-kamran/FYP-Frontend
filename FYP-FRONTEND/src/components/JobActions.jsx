import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Edit, Trash2, Power, HelpCircle } from 'lucide-react';

const JobActions = ({ job, onEdit, onDelete, onStatusChange, onAddQuestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Toggle Menu and calculate position
  const toggleMenu = (e) => {
    e.stopPropagation();
    
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // Calculate position based on the button's location on screen
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const spaceBelow = screenHeight - rect.bottom;
      
      // Decide whether to open Up or Down based on space
      const openUpwards = spaceBelow < 220; // If less than 220px below, open up

      setMenuStyle({
        position: 'fixed',
        zIndex: 9999,
        // Align the right side of the menu with the right side of the button
        left: `${rect.right - 192}px`, // 192px is the width of w-48
        top: openUpwards 
          ? `${rect.top - 8}px`  // Open up (anchor to top of button)
          : `${rect.bottom + 8}px`, // Open down (anchor to bottom of button)
        transform: openUpwards ? 'translateY(-100%)' : 'none',
      });
      
      setIsOpen(true);
    }
  };

  // Close when clicking outside or scrolling
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Close if clicking outside the menu AND outside the trigger button
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => setIsOpen(false); // Close menu on scroll to prevent floating issues

    if (isOpen) {
      window.addEventListener('mousedown', handleGlobalClick);
      window.addEventListener('scroll', handleScroll, true); // Capture scroll on any element
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      window.removeEventListener('mousedown', handleGlobalClick);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  const toggleStatus = (e) => {
    e.stopPropagation();
    const newStatus = job.status === 'Open' ? 'Closed' : 'Open';
    onStatusChange(job.jobId, newStatus);
    setIsOpen(false);
  };

  // The content of the dropdown
  const menuContent = (
    <div 
      ref={menuRef}
      style={menuStyle}
      className="w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="py-1">
        {/* 1. Status Action */}
        <button 
          onClick={toggleStatus}
          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
            job.status === 'Open' 
              ? 'text-gray-700 hover:bg-gray-50 hover:text-orange-600' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
          }`}
        >
          <Power size={16} className={job.status === 'Open' ? 'text-green-600' : 'text-gray-400'} />
          <span>{job.status === 'Open' ? 'Close Job' : 'Open Job'}</span>
        </button>

        {/* 2. Add Questions Action */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction(onAddQuestions); }}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 flex items-center gap-3 transition-colors"
        >
          <HelpCircle size={16} />
          <span>Add Questions</span>
        </button>

        {/* 3. Edit Action */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction(onEdit); }}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        
        {/* 4. Delete Action */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction(onDelete); }}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-3 transition-colors border-t border-gray-50"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
      >
        <MoreHorizontal size={20} />
      </button>

      {/* Render the menu directly into the body to avoid clipping */}
      {isOpen && createPortal(menuContent, document.body)}
    </>
  );
};

export default JobActions;
