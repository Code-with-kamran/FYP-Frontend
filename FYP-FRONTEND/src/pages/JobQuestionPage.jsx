import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, MoreHorizontal, HelpCircle } from 'lucide-react'; // ADDED MISSING IMPORTS
import apiClient from '../Config/apiClient';
import { API_ENDPOINTS } from '../Config/theme';
import Swal from 'sweetalert2';
import JobQuestionModal from '../components/JobQuestionModal';
import ReusableTable from '../components/ReusableTable';

// FIXED: QuestionsJobActions component
const QuestionsJobActions = ({ job, onAddQuestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null); // FIXED: Added missing useRef

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpwards = spaceBelow < 100;

      setMenuStyle({
        position: 'fixed',
        zIndex: 9999,
        left: `${rect.right - 160}px`,
        top: openUpwards ? `${rect.top - 8}px` : `${rect.bottom + 8}px`,
        transform: openUpwards ? 'translateY(-100%)' : 'none',
      });
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && createPortal(
        <div 
          style={menuStyle}
          className="w-40 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="py-1">
            <button 
              onClick={() => { onAddQuestions(); setIsOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 flex items-center gap-3 transition-colors"
            >
              <HelpCircle size={16} />
              <span>Add Questions</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const JobQuestionPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedJobForQuestions, setSelectedJobForQuestions] = useState(null);

  const fetchOpenJobs = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.JOBS_LIST);
      const openJobs = (response.data || []).filter(job => job.status === 'Open');
      setJobs(openJobs);
    } catch (error) {
      console.error("Failed to fetch open jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOpenJobs(); }, []);

  const handleSaveQuestions = async (questionsQueue) => {
    if (!selectedJobForQuestions) return;
    try {
      await apiClient.put(`${API_ENDPOINTS.JOBS_LIST}/${selectedJobForQuestions.jobId}/questions`, questionsQueue);
      setIsQuestionModalOpen(false);
      setSelectedJobForQuestions(null);
      Swal.fire('Success', 'Questions saved successfully!', 'success');
      fetchOpenJobs();
    } catch (error) {
      Swal.fire('Error', 'Failed to save questions. Please try again.', 'error');
    }
  };

  const columns = [
    {
      name: 'Job Title / Dept',
      selector: row => row.jobTitle,
      sortable: true,
      cell: row => (
        <div className="py-2">
          <div className="font-bold text-gray-800">{row.jobTitle}</div>
          <div className="text-xs text-gray-500">{row.department}</div>
        </div>
      ),
      grow: 2,
    },
    {
      name: 'Description',
      selector: row => row.jobDescription,
      sortable: false,
      grow: 2,
      cell: row => (
        <div className="truncate text-gray-600 max-w-xs" title={row.jobDescription}>
          {row.jobDescription || 'No description'}
        </div>
      )
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex items-center justify-center w-full">
          <QuestionsJobActions 
            job={row} 
            onAddQuestions={() => { 
              setSelectedJobForQuestions(row); 
              setIsQuestionModalOpen(true); 
            }}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '80px',
    },
  ];

  const filteredItems = useMemo(() => {
    if (!searchQuery) return jobs;
    const lowerQuery = searchQuery.toLowerCase();
    return jobs.filter(item => 
      Object.values(item).some(val => 
        val && String(val).toLowerCase().includes(lowerQuery)
      )
    );
  }, [jobs, searchQuery]);

  return (
    <div className="min-h-screen text-gray-800 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Screening Questions</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage screening questions for open job positions</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-t-xl border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="Search open jobs..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Search size={32} className="absolute inset-y-2 left-0 pl-3 flex items-center text-gray-400" />
        </div>
      </div>

      <ReusableTable 
        columns={columns} 
        data={filteredItems} 
        loading={loading} 
      />

      {isQuestionModalOpen && (
        <JobQuestionModal
          job={selectedJobForQuestions}
          onClose={() => setIsQuestionModalOpen(false)}
          onSave={handleSaveQuestions}
        />
      )}
    </div>
  );
};

export default JobQuestionPage;
