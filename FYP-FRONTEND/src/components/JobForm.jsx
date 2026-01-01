import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import InputField from '../components/InputField'; // Adjust path if needed

const JobForm = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    department: '',
    location: '',
    status: 'Open',
    closingDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || '',
        jobDescription: job.jobDescription || '',
        department: job.department || '',
        location: job.location || '',
        status: job.status || 'Open',
        closingDate: job.closingDate ? job.closingDate.split('T')[0] : ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Description is required';
    if (!formData.closingDate) newErrors.closingDate = 'Closing Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Optional: Show a toast that validation failed
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      // Toast.fire({ icon: 'error', title: 'Please fix the errors in the form.' });
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'An error occurred while saving the job. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {job ? 'Edit Job Position' : 'Create New Job'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-1">
            
            <InputField
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
                required={true}
                error={errors.jobTitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Engineering"
                    required={true}
                    error={errors.department}
                />
                <InputField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote"
                    required={true}
                    error={errors.location}
                />
            </div>
                    <InputField
                      label="Closing Date"
                      name="closingDate"
                      type="date"
                      value={formData.closingDate}
                      onChange={handleChange}
                      required={true}
                      error={errors.closingDate}
                    />
            {/* Description Area - Manually styled to match InputField exactly */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="jobDescription">
                  Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows="4"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Enter job details..."
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all resize-none ${
                        errors.jobDescription 
                          ? 'border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:ring-0 focus:ring-primary focus:border-primary'
                    }`}
                />
                {errors.jobDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>
                )}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-2">
                <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition-colors"
                >
                {job ? 'Update Job' : 'Create Job'}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
