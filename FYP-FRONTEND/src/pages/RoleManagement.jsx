import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Skeleton from '../components/Skeleton';

const RoleManagement = () => {
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            setRoles([
                { id: 1, name: 'Admin', description: 'Full access to all features', users: 3 },
                { id: 2, name: 'Recruiter', description: 'Can post jobs and view candidates', users: 12 },
                { id: 3, name: 'Candidate', description: 'Can apply for jobs', users: 150 },
            ]);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAdd = async () => {
        const { value: name } = await Swal.fire({
            title: 'Add New Role',
            input: 'text',
            inputLabel: 'Role Name',
            inputPlaceholder: 'Enter role name',
            showCancelButton: true,
            confirmButtonColor: '#1960C8',
            cancelButtonColor: '#d33',
        });

        if (name) {
            setRoles([...roles, { id: roles.length + 1, name, description: 'New Role', users: 0 }]);
            Swal.fire({
                title: 'Success!',
                text: 'Role added successfully!',
                icon: 'success',
                confirmButtonColor: '#1960C8',
            });
        }
    };

    const handleEdit = async (role) => {
        const { value: newName } = await Swal.fire({
            title: 'Edit Role',
            input: 'text',
            inputLabel: 'Role Name',
            inputValue: role.name,
            showCancelButton: true,
            confirmButtonColor: '#1960C8',
            cancelButtonColor: '#d33',
        });

        if (newName) {
            setRoles(roles.map(r => r.id === role.id ? { ...r, name: newName } : r));
            Swal.fire({
                title: 'Updated!',
                text: 'Role name has been updated.',
                icon: 'success',
                confirmButtonColor: '#1960C8',
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setRoles(roles.filter(role => role.id !== id));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Role has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#1960C8',
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
                <button
                    onClick={handleAdd}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md flex items-center group"
                >
                    <FaPlus className="mr-2 transition-transform duration-300 group-hover:rotate-90" />
                    Add New Role
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Role Name</th>
                            <th className="p-4 font-semibold text-gray-600">Description</th>
                            <th className="p-4 font-semibold text-gray-600">Active Users</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // Skeleton Rows
                            [1, 2, 3].map((i) => (
                                <tr key={i} className="border-b border-gray-50">
                                    <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                                    <td className="p-4"><Skeleton className="h-5 w-48" /></td>
                                    <td className="p-4"><Skeleton className="h-5 w-12" /></td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <Skeleton className="h-8 w-16 rounded" />
                                            <Skeleton className="h-8 w-16 rounded" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            roles.map((role) => (
                                <tr key={role.id} className="border-b border-gray-50 hover:bg-blue-50 transition-all duration-200 hover:shadow-sm">
                                    <td className="p-4 font-medium text-gray-800">{role.name}</td>
                                    <td className="p-4 text-gray-600">{role.description}</td>
                                    <td className="p-4 text-gray-600">{role.users}</td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(role)}
                                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200 flex items-center hover:scale-105 group"
                                            >
                                                <FaEdit className="mr-1 transition-transform duration-200 group-hover:rotate-12" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(role.id)}
                                                className="text-red-600 hover:text-red-800 font-medium hover:underline transition-all duration-200 flex items-center hover:scale-105 group"
                                            >
                                                <FaTrash className="mr-1 transition-transform duration-200 group-hover:scale-110" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoleManagement;
