import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Mail, User } from 'lucide-react';
import apiClient from '../Config/apiClient';
import { API_ENDPOINTS } from '../Config/theme';
import Swal from 'sweetalert2';
import UserForm from '../components/UserForm';
import RoleActions from '../components/RoleActions';
import ReusableTable from '../components/ReusableTable'; // <--- Import your component

const RoleManagement = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // --- API Calls ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS_LIST);
      
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      Swal.fire('Error', 'Failed to load users', 'error');
      setUsers([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

 // In RoleManagement.jsx

const handleCreateOrUpdate = async (formData) => {
  try {
    if (editingUser) {
      await apiClient.put(API_ENDPOINTS.USERS_UPDATE(editingUser.id), formData);
      Swal.fire('Success', 'User updated successfully', 'success');
    } else {
      // Ensure the endpoint is correct. Usually it is just '/Users' for POST
      await apiClient.post(API_ENDPOINTS.USERS_CREATE, formData);
      Swal.fire('Success', 'User created successfully', 'success');
    }
    setIsModalOpen(false);
    setEditingUser(null);
    fetchUsers();
  } catch (error) {
    console.error("Operation failed", error);
    
    // --- EXTRACT SERVER ERROR MESSAGE ---
    let errorMessage = 'Failed to save user';
    
    // Check if the server sent a specific validation error message
    if (error.response && error.response.data) {
      // Sometimes errors come as a string, sometimes as an object
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.title) {
        errorMessage = error.response.data.title; // Standard ASP.NET error title
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      // If it's a validation errors object (e.g. Password too weak)
      if (error.response.data.errors) {
        const firstErrorKey = Object.keys(error.response.data.errors)[0];
        errorMessage = error.response.data.errors[firstErrorKey][0];
      }
    }

    Swal.fire('Error', errorMessage, 'error');
  }
};


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(API_ENDPOINTS.USERS_DELETE(id));
        Swal.fire('Deleted!', 'User has been removed.', 'success');
        fetchUsers();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: newStatus } : u));
      await apiClient.patch(API_ENDPOINTS.USERS_STATUS(id), { isActive: newStatus });
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      Toast.fire({ icon: 'success', title: `User ${newStatus ? 'Activated' : 'Deactivated'}` });
    } catch (error) {
      Swal.fire('Error', 'Status update failed', 'error');
      fetchUsers(); 
    }
  };

  // --- Columns ---
  const columns = [
    {
      name: 'Role Name / User',
      selector: row => row.fullName,
      sortable: true,
      cell: row => (
        <div className="py-2">
          <div className="flex items-center gap-2 font-bold text-gray-800">
            <User size={16} className="text-blue-500" />
            {row.fullName}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 ml-6 bg-gray-100 inline-block px-2 py-0.5 rounded">
            {row.role}
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: 'Description / Email',
      selector: row => row.email,
      sortable: true,
      cell: row => (
        <div className="flex items-center gap-2 text-gray-600">
          <Mail size={14} />
          {row.email}
        </div>
      ),
      grow: 2,
    },
    {
      name: 'Active Users',
      selector: row => row.isActive,
      sortable: true,
      cell: row => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
          row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <span className={`w-2 h-2 rounded-full ${row.isActive ? 'bg-green-600' : 'bg-red-600'}`}></span>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <RoleActions 
          user={row} 
          onEdit={() => { setEditingUser(row); setIsModalOpen(true); }} 
          onDelete={() => handleDelete(row.id)}
          onStatusChange={() => handleStatusChange(row.id, row.isActive)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '120px',
    },
  ];

  const filteredItems = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.filter(item => 
      (item.fullName && item.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [users, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-500 mt-1">Manage system users and access levels</p>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all"
        >
          <Plus size={18} /> Add New User
        </button>
      </div>
      
      {/* Search */}
      <div className="bg-white p-4 rounded-t-xl border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="Search users..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Search size={32} className="absolute inset-y-2 left-0 pl-3 flex items-center text-gray-400" />
        </div>
      </div>

      {/* Reusable Table Component */}
      <ReusableTable 
        columns={columns} 
        data={filteredItems} 
        loading={loading} 
      />

      {/* Modal */}
      {isModalOpen && (
        <UserForm 
          user={editingUser} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateOrUpdate} 
        />
      )}
    </div>
  );
};

export default RoleManagement;
