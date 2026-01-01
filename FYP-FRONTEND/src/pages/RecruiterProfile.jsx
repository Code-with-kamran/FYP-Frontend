import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const RecruiterProfile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageClick = () => {
        document.getElementById('profileImageInput').click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Success!',
            text: 'Profile saved successfully!',
            icon: 'success',
            confirmButtonColor: '#1960C8',
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
            confirmButtonText: 'Yes, discard changes!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/dashboard';
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recruiter Profile</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                {/* Profile Image Upload Section */}
                <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
                    <div className="relative group">
                        <div
                            onClick={handleImageClick}
                            className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer border-4 border-white shadow-lg ring-2 ring-gray-200 hover:ring-primary transition-all duration-300 group-hover:scale-105"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <FaCamera className="text-3xl mb-1" />
                                    <span className="text-xs">Upload Photo</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-primary-hover transition-colors group-hover:scale-110">
                            <FaCamera className="text-sm" />
                        </div>
                    </div>
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-3">Click to upload profile picture</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                placeholder="john@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                placeholder="Tech Corp"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:border-primary hover:shadow-sm"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 h-32 hover:border-primary hover:shadow-sm"
                            placeholder="Tell us about yourself and your company..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center group"
                        >
                            <FaTimes className="mr-2 transition-transform duration-200 group-hover:rotate-90" />
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md flex items-center group">
                            <FaSave className="mr-2 transition-transform duration-200 group-hover:scale-110" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecruiterProfile;
