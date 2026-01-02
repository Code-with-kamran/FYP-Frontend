import React from 'react';

const TableSkeleton = () => {
  // Increased to 8 rows since they are now thinner
  const rows = Array(8).fill(0);

  return (
    <div className="w-full bg-white">
      {rows.map((_, index) => (
        <div 
          key={index} 
          // UPDATED: Reduced vertical padding (py-2) to make rows closer
          className="flex items-center justify-between px-4 py-2 border-b border-gray-100 last:border-0"
        >
          {/* Column 1: User Info (Avatar + Name + Email) */}
          <div className="flex items-center gap-3 flex-[2]">
            {/* UPDATED: Darker color (gray-300) */}
            <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
            
            <div className="space-y-1.5">
              {/* UPDATED: Darker color (gray-300) */}
              <div className="h-3.5 w-32 bg-gray-300 rounded animate-pulse" />
              {/* UPDATED: Darker color (gray-200) */}
              <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Column 2: Role / Description */}
          <div className="hidden md:flex flex-1 items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300 animate-pulse" />
            <div className="h-3.5 w-24 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Column 3: Status Pill */}
          <div className="flex-1">
            {/* UPDATED: Darker color */}
            <div className="h-5 w-16 rounded-full bg-gray-300 animate-pulse" />
          </div>

          {/* Column 4: Actions */}
          <div className="w-[120px] flex justify-end pr-4">
            {/* UPDATED: Darker color */}
            <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
