import React from 'react';

const Skeleton = ({ className = '', rounded = 'md' }) => {
    const roundedClasses = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    return <div className={`animate-pulse bg-slate-200 ${roundedClasses[rounded] || roundedClasses.md} ${className}`.trim()} />;
};

export default Skeleton;
