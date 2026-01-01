import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CVUpload = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // Simulate file processing
        handleUpload();
    };

    const handleUpload = () => {
        const loadingToast = toast.loading('Parsing CV...');

        setTimeout(() => {
            toast.dismiss(loadingToast);
            toast.success('CV Uploaded Successfully!');
            // Navigate to candidate profile which will "fetch" the parsed data
            navigate('/candidate-profile');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Your CV</h2>
                <p className="text-gray-600">We'll parse your details to auto-fill your profile.</p>
            </div>

            <div
                className={`
          border-4 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
          ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUpload}
            >
                <div className="w-20 h-20 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCloudUploadAlt className="text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isDragging ? 'Drop your file here' : 'Click to upload or drag and drop'}
                </h3>
                <p className="text-gray-500 mb-6">PDF, DOCX, or RTF (Max 10MB)</p>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                        <FaFileAlt className="mr-1" /> PDF
                    </div>
                    <div className="flex items-center">
                        <FaFileAlt className="mr-1" /> DOCX
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVUpload;
