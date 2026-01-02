import React from 'react';
import DataTable from 'react-data-table-component';
import TableSkeleton from './TableSkeleton';

const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#2563eb',
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
      minHeight: '50px',
      '&:hover': { backgroundColor: '#f8fafc' },
      overflow: 'visible !important', // Allow dropdowns to spill out
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '0.875rem',
      color: '#334155',
      overflow: 'visible !important', // Allow dropdowns to spill out
    },
  },
  // --- CRITICAL FIXES FOR CLIPPING ---
  table: {
    style: {
      overflow: 'visible !important',
    },
  },
  tableWrapper: {
    style: {
      overflow: 'visible !important',
    },
  },
  responsiveWrapper: {
    style: {
      overflow: 'visible !important', // This is usually the culprit
    },
  },
};

const ReusableTable = ({ columns, data, loading, pagination = true }) => {
  return (
    // Ensure this container does NOT have overflow-hidden
    <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 z-0">
      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        progressPending={loading}
        progressComponent={<TableSkeleton />}
        persistTableHead={true}
        customStyles={customStyles}
        highlightOnHover
        responsive // Note: 'responsive' adds a wrapper that might clip. If issues persist, try removing this prop.
        noDataComponent={<div className="p-8 text-gray-500 text-center">No records found.</div>}
      />
    </div>
  );
};

export default ReusableTable;
