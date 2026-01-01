import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
    const variantClasses = {
        rectangular: 'rounded',
        circular: 'rounded-full',
        rounded: 'rounded-lg',
        text: 'rounded h-4',
    };

    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${variantClasses[variant]} ${className}`}
            style={{
                animation: 'pulse 1.5s ease-in-out infinite, shimmer 2s ease-in-out infinite'
            }}
        >
            <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
};

export default Skeleton;
