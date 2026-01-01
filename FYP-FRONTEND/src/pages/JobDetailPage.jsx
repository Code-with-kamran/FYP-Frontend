import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import apiClient from '../Config/apiClient'; // Adjust path as needed
import { API_ENDPOINTS } from '../Config/theme'; // Adjust path as needed

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Using the function defined in your API_ENDPOINTS
        const response = await apiClient.get(API_ENDPOINTS.FULL_JOBS_DETAIL(id));
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color text-text-color">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-color text-text-color gap-4">
        <h2 className="text-xl font-bold text-red-500">{error || "Job not found"}</h2>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-color text-text-color p-4 md:p-8 font-sans">
      {/* Top Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back to Jobs
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Briefcase size={16} className="text-blue-500" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-red-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-green-500" />
                <span>Created: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
            job.status === 'Open' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                <Briefcase size={20} />
              </div>
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.jobDescription}
            </div>
          </div>
        </div>

        {/* Right Column: Screening Questions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg text-purple-600">
                <HelpCircle size={20} />
              </div>
              Screening Questions
              <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {job.questions?.length || 0}
              </span>
            </h2>

            <div className="space-y-4">
              {job.questions && job.questions.length > 0 ? (
                job.questions.map((q, index) => (
                  <div key={q.questionId} className="border border-gray-100 rounded-lg p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        <span className="text-blue-600 mr-2">Q{index + 1}.</span>
                        {q.questionText}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {q.questionType}
                      </span>
                    </div>

                    {/* Answers List */}
                    {q.predefinedAnswers && q.predefinedAnswers.length > 0 && (
                      <div className="space-y-1.5 mt-3 pl-2 border-l-2 border-gray-200">
                        {q.predefinedAnswers.map((ans) => (
                          <div key={ans.id} className="flex justify-between items-center text-xs">
                            <span className="text-gray-600 font-medium">{ans.answerText}</span>
                            {ans.scoreWeight > 0 && (
                              <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                +{ans.scoreWeight} pts
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 italic text-sm">
                  No screening questions added.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
