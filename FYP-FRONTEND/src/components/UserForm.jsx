import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Save } from 'lucide-react';
import InputField from './InputField';

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cnic: '',
    password: '',
    role: 'Candidate',
    isActive: true
  });

  // New State for Validation Errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        cnic: user.cnic || '',
        password: '',
        role: user.role || 'Candidate',
        isActive: user.isActive ?? true
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggle = (e) => {
    setFormData(prev => ({ ...prev, isActive: e.target.checked }));
  };

  // --- Validation Logic ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required";
      isValid = false;
    }
    // Password is required only for NEW users
    if (!user && !formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 flex-none">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{user ? 'Edit User' : 'Create New User'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
            
            <InputField 
              label="Full Name" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="John Doe" 
              required 
              error={errors.fullName} // Pass error here
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="email@example.com" 
                required 
                error={errors.email}
              />
              <InputField 
                label="CNIC" 
                name="cnic" 
                value={formData.cnic} 
                onChange={handleChange} 
                placeholder="35202-..." 
                required 
                error={errors.cnic}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <div className="relative">
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer text-gray-700"
                >
                  <option value="Admin">Admin</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Candidate">Candidate</option>
                  <option value="Interviewer">Interviewer</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Account Status</label>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isActive} 
                  onChange={handleToggle} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className={`ml-3 text-sm font-medium ${formData.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {formData.isActive ? 'Active Account' : 'Inactive Account'}
                </span>
              </label>
            </div>

            {!user && (
              <InputField 
                label="Password" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
                required 
                error={errors.password}
              />
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex-none">
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-3 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              form="user-form" 
              className="px-3 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Save size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> 
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserForm;
