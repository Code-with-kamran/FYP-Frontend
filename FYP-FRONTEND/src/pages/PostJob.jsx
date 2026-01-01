import React, { useState } from 'react';
import { FaBriefcase, FaSave, FaTimes, FaMapMarkerAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PostJob = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        department: '',
        location: '',
        employmentType: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        deadline: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Success!',
            text: 'Job posting has been created successfully!',
            icon: 'success',
            confirmButtonColor: '#1960C8',
        });
        // Reset form
        setFormData({
            jobTitle: '',
            department: '',
            location: '',
            employmentType: 'Full-time',
            salaryMin: '',
            salaryMax: '',
            description: '',
            requirements: '',
            responsibilities: '',
            benefits: '',
            deadline: '',
        });
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You have unsaved changes. Do you want to discard them?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, discard!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/dashboard';
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaBriefcase className="mr-3 text-primary" />
                    Post a New Job
                </h2>
                <p className="text-gray-600 mt-1">Fill in the details to create a new job posting</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                    placeholder="e.g., Senior React Developer"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                    placeholder="e.g., Engineering"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                        placeholder="e.g., San Francisco, CA"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                                <select
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                    required
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary ($)</label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        value={formData.salaryMin}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                        placeholder="50000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary ($)</label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        value={formData.salaryMax}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                        placeholder="80000"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Job Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm h-32"
                                    placeholder="Provide a detailed description of the job role..."
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements *</label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm h-32"
                                    placeholder="List the required qualifications, skills, and experience..."
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                                <textarea
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm h-32"
                                    placeholder="Describe the key responsibilities..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                                <textarea
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm h-24"
                                    placeholder="List the benefits offered..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center group"
                        >
                            <FaTimes className="mr-2 transition-transform duration-200 group-hover:rotate-90" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md flex items-center group"
                        >
                            <FaSave className="mr-2 transition-transform duration-200 group-hover:scale-110" />
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
