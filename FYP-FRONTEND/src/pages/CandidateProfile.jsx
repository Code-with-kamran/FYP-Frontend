import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaCheckCircle, 
  FaBriefcase, FaGraduationCap, FaSpinner, FaCloudUploadAlt, 
  FaExclamationTriangle, FaCamera, FaPen 
} from 'react-icons/fa';

import apiClient from '../Config/apiClient';
import { API_ENDPOINTS } from '../Config/theme'; // Ensure this exists

// --- HELPER COMPONENTS ---
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4 border-b pb-2 border-gray-100">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
      <Icon className="text-lg" />
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="mb-3">
    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{label}</p>
    <p className="text-gray-700 font-medium break-all">{value || 'N/A'}</p>
  </div>
);

const Badge = ({ status }) => {
  const colors = {
    HIRED: 'bg-green-100 text-green-700 border-green-200',
    SHORTLISTED: 'bg-blue-100 text-blue-700 border-blue-200',
    INTERVIEW: 'bg-purple-100 text-purple-700 border-purple-200',
    NEW: 'bg-gray-100 text-gray-600 border-gray-200',
    REJECTED: 'bg-red-50 text-red-600 border-red-100'
  };

  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || colors.NEW}`}>
      {status || 'NEW'}
    </span>
  );
};


// --- MAIN COMPONENT ---
const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  // 1. FETCH PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(API_ENDPOINTS.ME);
      if (res.data.success) {
        setProfile(res.data.data);
      } else {
        setError(res.data.message || 'Failed to load profile.');
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 2. CV UPLOAD HANDLER (Fixed Endpoint)
  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Optimistic UI: Show "Uploaded" state immediately
      setProfile(prev => ({ ...prev, resumeState: 'UPLOADED' }));

      // Fixed Endpoint: /CVProfile/{id}/upload-cv
      await apiClient.post(`/CVProfile/${profile.id}/upload-cv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Poll to check for parsed results
      setTimeout(fetchProfile, 3000); 
    } catch (err) {
      alert("CV Upload failed. Please try again.");
      fetchProfile(); // Revert on error
    }
  };

  // 3. IMAGE UPLOAD HANDLER (New Feature)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingImage(true);
      
      // Endpoint: /CVProfile/{id}/upload-image
      const res = await apiClient.post(`/CVProfile/${profile.id}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if(res.data.success) {
        // Update image immediately without full reload
        setProfile(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
        alert("Profile picture updated!");
      }
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <p className="text-gray-500 font-medium">Loading Profile...</p>
      </div>
    </div>
  );

  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- LEFT SIDEBAR (Profile Info) --- */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center relative overflow-hidden">
            <div className="w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 absolute top-0 left-0"></div>
            
            {/* AVATAR UPLOAD SECTION */}
            <div className="relative mt-8 mb-4 inline-block group">
              <div className="w-28 h-28 mx-auto bg-white rounded-full p-1 shadow-lg relative overflow-hidden">
                <img 
                  src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.fullName}&background=random`} 
                  alt="Profile" 
                  className={`w-full h-full rounded-full object-cover ${uploadingImage ? 'opacity-50' : ''}`}
                />
                
                {/* Upload Spinner */}
                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaSpinner className="animate-spin text-blue-600 text-xl" />
                  </div>
                )}

                {/* Hover Overlay */}
                <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <FaCamera className="text-white opacity-0 group-hover:opacity-100 text-2xl transform scale-50 group-hover:scale-100 transition-all duration-300" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900">{profile.fullName}</h1>
            <p className="text-gray-500 text-sm mb-4">{profile.role}</p>
            
            <div className="flex justify-center gap-2 mb-6">
               <Badge status={profile.applicationState} />
            </div>

            <div className="text-left space-y-4 pt-4 border-t border-gray-100">
              <InfoItem label="Email" value={profile.email} />
              <InfoItem label="CNIC" value={profile.cnic} />
              <InfoItem label="Updated" value={new Date(profile.updatedAt).toLocaleDateString()} />
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT (Resume Logic) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            
            {/* CASE 1: NO RESUME */}
            {profile.resumeState === 'NONE' && (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <FaCloudUploadAlt className="text-4xl text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload your Resume</h2>
                <p className="text-gray-500 max-w-md mb-8">
                  Upload your CV (PDF) to auto-fill your profile.
                </p>
                <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span>Select PDF File</span>
                  <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} />
                </label>
              </div>
            )}

            {/* CASE 2: PROCESSING */}
            {profile.resumeState === 'UPLOADED' && (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing your Resume...</h2>
                <p className="text-gray-500">We are processing your file. This may take a moment.</p>
                <button onClick={fetchProfile} className="mt-6 text-blue-600 hover:underline">Refresh Status</button>
              </div>
            )}

            {/* CASE 3: PARSED DATA */}
            {profile.resumeState === 'PARSED' && profile.parsedData && (
              <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Resume Details</h2>
                  {profile.resumeUrl && (
                    <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <FaFileAlt /> View Original PDF
                    </a>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-10">
                   <SectionHeader icon={FaCheckCircle} title="Skills" />
                   <div className="flex flex-wrap gap-2">
                     {profile.parsedData.skills?.map((skill, i) => (
                       <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">
                         {skill}
                       </span>
                     ))}
                   </div>
                </div>

                {/* Experience */}
                <div className="mb-10">
                   <SectionHeader icon={FaBriefcase} title="Experience" />
                   <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                     {profile.parsedData.experience?.map((exp, i) => (
                       <div key={i} className="relative pl-6 pb-2">
                         <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                         <p className="text-gray-800 font-medium">{exp}</p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Education */}
                <div>
                   <SectionHeader icon={FaGraduationCap} title="Education" />
                   <div className="space-y-3">
                     {profile.parsedData.education?.map((edu, i) => (
                       <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                         <FaGraduationCap className="text-gray-400 mt-1" />
                         <p className="text-gray-700 font-medium">{edu}</p>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* CASE 4: FAILED */}
            {profile.resumeState === 'FAILED' && (
              <div className="text-center py-10">
                <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                  <FaExclamationTriangle className="text-2xl text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Parsing Failed</h3>
                <p className="text-gray-500 mb-6">We couldn't read your resume. Please try a different file.</p>
                <button 
                  onClick={() => setProfile({...profile, resumeState: 'NONE'})} 
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
                >
                  Try Again
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
