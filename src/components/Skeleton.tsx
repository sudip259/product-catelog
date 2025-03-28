import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  shape?: 'rectangle' | 'circle';
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = 'full', 
  height = '64', 
  shape = 'rectangle',
  className = '' 
}) => {
  const shapeClasses = {
    rectangle: 'rounded',
    circle: 'rounded-full'
  };

  return (
    <div 
      className={`
        bg-gray-200 
        animate-pulse 
        w-${width} 
        h-${height} 
        ${shapeClasses[shape]} 
        ${className}
      `}
    >
      {/* Optional icon for image skeletons */}
      {shape === 'rectangle' && (
        <div className="flex items-center justify-center h-full">
          <svg 
            className="w-12 h-12 text-gray-300" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm7.555 9.788c-.379.467-.87.788-1.438.788H4.883a1.475 1.475 0 0 1-1.438-.788L2 9h16l-2.445 5.788Z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Skeleton;