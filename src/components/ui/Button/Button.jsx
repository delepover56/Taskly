import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const styles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    };

    return (
        <button
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${styles[variant] || styles.primary} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
