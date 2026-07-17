import React from 'react';

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`.trim()}
            {...props}
        />
    );
};

export default Input;
