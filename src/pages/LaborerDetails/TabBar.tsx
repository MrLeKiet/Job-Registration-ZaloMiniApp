// TabBar.tsx (Improved for mobile: sticky tab bar, smoother transitions, and better touch scrolling)
import React, { useEffect, useRef, useState } from "react";

import LaborerJobInfo from "./LaborerJobInfo";
import LaborerOtherInfo from "./LaborerOtherInfo";

const tabList = [
    { label: "Thông tin nghề nghiệp", id: "job-info", component: <LaborerJobInfo /> },
    { label: "Thông tin khác", id: "other-info", component: <LaborerOtherInfo /> },
];

const TabBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabList[0].id);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeButton = tabsRef.current?.querySelector<HTMLButtonElement>(
            `[data-id="${activeTab}"]`
        );
        if (activeButton) {
            const { offsetLeft, offsetWidth } = activeButton;
            setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeTab]);

    const activeComponent = tabList.find(tab => tab.id === activeTab)?.component;

    return (
        <div className="w-full">
            <div className="sticky top-0 z-10 bg-white shadow-md">
                <div
                    ref={tabsRef}
                    className="flex gap-6 p-4 overflow-x-auto no-scrollbar min-w-max border-b border-gray-200 relative"
                >
                    {tabList.map(tab => (
                        <button
                            key={tab.id}
                            data-id={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2 text-base font-medium transition-colors duration-300 whitespace-nowrap ${activeTab === tab.id
                                    ? "text-blue-700"
                                    : "text-gray-500 hover:text-blue-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <span
                        className="absolute bottom-0 h-1 bg-blue-700 transition-all duration-300 rounded-full"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                        }}
                    />
                </div>
            </div>

            <div className="mt-4">{activeComponent}</div>
        </div>
    );
};

export default TabBar;