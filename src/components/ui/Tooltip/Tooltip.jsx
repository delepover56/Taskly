import React, { useState } from 'react';

const Tooltip = ({ label, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {children}
            {visible && (
                <div className="absolute z-10 mt-2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white">
                    {label}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
