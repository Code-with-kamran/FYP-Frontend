// src/components/ReusableTable.jsx
import React from 'react';
import DataTable from 'react-data-table-component';

// Define your custom styles here so they are consistent across the app
const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#2563eb', // Primary Blue
      color: '#ffffff',
      borderBottomWidth: '0px',
      minHeight: '50px',
    },
  },
  headCells: {
    style: {
      fontSize: '0.85rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      paddingLeft: '16px',
      paddingRight: '16px',
      color: '#ffffff',
    },
  },
  rows: {
    style: {
      minHeight: '60px',
      '&:hover': {
        backgroundColor: '#f8fafc',
      },
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '0.875rem',
      color: '#334155',
    },
  },
};

const ReusableTable = ({ columns, data, loading, pagination = true }) => {
  return (
    <div className="bg-white rounded-b-xl shadow-sm border border-gray-100">
      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        progressPending={loading}
        customStyles={customStyles}
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default ReusableTable;
