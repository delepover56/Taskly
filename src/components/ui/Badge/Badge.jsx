import React from 'react';



const Badge = ({ children, variant = 'default' }) => {
    const styles = {
        default: 'bg-slate-900 text-white',
        success: 'bg-emerald-500 text-white',
        warning: 'bg-amber-500 text-white',
        danger: 'bg-rose-500 text-white',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant] || styles.default}`}>
            {children}
        </span>
    );
};

export default Badge;
