import React from 'react';

const Dialog = ({ children, open = false }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">{children}</div>
        </div>
    );
};

export default Dialog;
