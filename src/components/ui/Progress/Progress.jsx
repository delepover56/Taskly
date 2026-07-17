import React from 'react';

const Progress = ({ value = 0, max = 100 }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${percentage}%` }} />
        </div>
    );
};

export default Progress;
