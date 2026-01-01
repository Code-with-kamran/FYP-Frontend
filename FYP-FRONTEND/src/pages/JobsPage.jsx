import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import apiClient from '../Config/apiClient';
import { API_ENDPOINTS } from '../Config/theme';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import JobForm from '../components/JobForm';
import JobActions from '../components/JobActions';
import JobQuestionModal from '../components/JobQuestionModal';
import ReusableTable from '../components/ReusableTable'; // Import the new component

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedJobForQuestions, setSelectedJobForQuestions] = useState(null);
 const navigate = useNavigate(); 
  const getUserId = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.id) return user.id;
      }
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return parseInt(decoded.sub || decoded.nameid || decoded.id || 0);
      }
    } catch (e) { console.error(e); }
    return 0;
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.JOBS_LIST);
      setJobs(response.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await apiClient.patch(`${API_ENDPOINTS.JOBS_STATUS(jobId)}`, { status: newStatus });
      setJobs(prevJobs => prevJobs.map(job => 
        job.jobId === jobId ? { ...job, status: newStatus } : job
      ));
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      Toast.fire({ icon: 'success', title: `Job ${newStatus === 'Open' ? 'Opened' : 'Closed'}` });
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const handleCreateOrUpdateJob = async (formData) => {
      const userId = getUserId();
      const payload = { ...formData, createdBy: userId, department: formData.department || 'General', location: formData.location || 'Remote' };
      try {
        if (editingJob) {
          await apiClient.put(API_ENDPOINTS.JOBS_UPDATE(editingJob.jobId), payload);
          Swal.fire('Success', 'Job updated successfully!', 'success');
        } else {
          await apiClient.post(API_ENDPOINTS.JOBS_CREATE, payload);
          Swal.fire('Success', 'Job created successfully!', 'success');
        }
        setIsJobModalOpen(false);
        setEditingJob(null);
        fetchJobs();
      } catch (error) {
        console.error("Failed to save job", error);
        Swal.fire('Error', 'Failed to save job. Please try again.', 'error');
      }
  };

  const handleDeleteJob = async (jobId) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        await apiClient.delete(API_ENDPOINTS.JOBS_DELETE(jobId));
        fetchJobs();
        Swal.fire('Deleted!', 'Job has been deleted.', 'success');
      }
  };

  const handleSaveQuestions = async (questionsQueue) => {
      if (!selectedJobForQuestions) return;
      await apiClient.put(`${API_ENDPOINTS.JOBS_LIST}/${selectedJobForQuestions.jobId}/questions`, questionsQueue);
      setIsQuestionModalOpen(false);
      setSelectedJobForQuestions(null);
      Swal.fire('Success', 'Questions saved!', 'success');
  };

  // Define Columns
  const columns =  [
      {
      name: 'Job Title',
      selector: row => row.jobTitle,
      sortable: true,
      cell: row => (
        <div className="py-2">
          {/* Clickable Title */}
          <div 
            onClick={() => navigate(`/jobDetails/${row.jobId}`)} 
            className="font-bold text-gray-800 cursor-pointer hover:text-blue-600 hover:underline transition-colors"
          >
            {row.jobTitle}
          </div>
          <div className="text-xs text-gray-500">{row.department}</div>
        </div>
      ),
      grow: 2,
    },
 
    // NEW COLUMN: Description
    {
        name: 'Description',
        selector: row => row.jobDescription,
        sortable: false,
        grow: 2,
        cell: row => (
            <div 
                className="truncate text-gray-600 max-w-xs" 
                title={row.jobDescription} // Show full text on hover
            >
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
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          row.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {row.status || 'Draft'}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex items-center justify-center w-full">
          <JobActions 
            job={row} 
            onEdit={() => { setEditingJob(row); setIsJobModalOpen(true); }} 
            onDelete={() => handleDeleteJob(row.jobId)}
            onStatusChange={handleStatusChange}
            onAddQuestions={() => { setSelectedJobForQuestions(row); setIsQuestionModalOpen(true); }}
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
    if (!searchQuery) return jobs; // Return all if search is empty

    const lowerQuery = searchQuery.toLowerCase();

    return jobs.filter(item => 
      // check EVERY field in the object automatically
      Object.values(item).some(val => 
        val && String(val).toLowerCase().includes(lowerQuery)
      )
    );
  }, [jobs, searchQuery]);


  return (
    <div className="min-h-screen  text-gray-800 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
        <button onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all">
          <Plus size={18} /> Create New Job
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-t-xl border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <input type="text" className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Search size={32} className="absolute inset-y-2 left-0 pl-3 flex items-center text-gray-400" />
        </div>
      </div>

      {/* REUSABLE TABLE COMPONENT */}
      <ReusableTable 
        columns={columns} 
        data={filteredItems} 
        loading={loading} 
      />

      {isJobModalOpen && <JobForm job={editingJob} onClose={() => setIsJobModalOpen(false)} onSubmit={handleCreateOrUpdateJob} />}
      
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

export default JobsPage;
