import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`.trim()}>
            {children}
        </div>
    );
};

export default Card;
