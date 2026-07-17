import React from 'react';

const Avatar = ({ src, alt = 'Avatar', name = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
    };

    return (
        <div
            className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-200 font-medium text-slate-700 ${sizeClasses[size] || sizeClasses.md}`}
        >
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <span>{name?.charAt(0)?.toUpperCase() || 'U'}</span>
            )}
        </div>
    );
};

export default Avatar;
