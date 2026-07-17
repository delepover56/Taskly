import React, { useState } from 'react';

const Tabs = ({ tabs = [], defaultValue }) => {
    const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

    return (
        <div>
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`rounded-md px-3 py-2 text-sm ${activeTab === tab.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-3">{tabs.find((tab) => tab.value === activeTab)?.content}</div>
        </div>
    );
};

export default Tabs;
