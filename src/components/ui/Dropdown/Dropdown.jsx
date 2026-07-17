import React, { useState } from 'react';

const Dropdown = ({ label, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button onClick={() => setOpen(!open)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                {label}
            </button>
            {open && <div className="absolute z-10 mt-2 w-40 rounded-md border border-slate-200 bg-white p-2 shadow-md">{children}</div>}
        </div>
    );
};

export default Dropdown;
