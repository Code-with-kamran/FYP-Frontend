import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

const RoleActions = ({ user, onEdit, onDelete, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // UPDATED: Increased threshold to 260px. 
      // This forces the menu to flip upwards much sooner (covering the 2nd last row).
      setOpenUpwards(spaceBelow < 260); 
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-end" ref={menuRef}>
      <button 
        onClick={toggleDropdown}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
          isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-500'
        }`}
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div 
          // z-50 ensures it floats above other table elements
          className={`absolute right-0 w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 ${
            openUpwards ? 'bottom-full mb-2 origin-bottom-right' : 'top-full mt-2 origin-top-right'
          }`}
        >
          <div className="py-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); setIsOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Edit size={16} /> Edit Details
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onStatusChange(user.id, !user.isActive); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${
                user.isActive ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'
              }`}
            >
              {user.isActive ? <Ban size={16} /> : <CheckCircle size={16} />}
              {user.isActive ? 'Deactivate User' : 'Activate User'}
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); setIsOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-3 border-t border-gray-50"
            >
              <Trash2 size={16} /> Delete User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleActions;
