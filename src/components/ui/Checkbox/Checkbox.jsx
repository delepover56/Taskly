import React from 'react';

const Checkbox = ({ label, checked = false, onChange, ...props }) => {
    return (
        <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-slate-300" {...props} />
            {label && <span>{label}</span>}
        </label>
    );
};

export default Checkbox;
