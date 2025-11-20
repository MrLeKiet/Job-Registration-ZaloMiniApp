import React from "react";
import { useNavigate } from "zmp-ui";

const ReturnHeader: React.FC = () => {
    const navigate = useNavigate();
    const returnHeaderRef = React.useRef<HTMLDivElement>(null);
        React.useEffect(() => {
            if (returnHeaderRef.current) {
                const height = returnHeaderRef.current.offsetHeight;
                document.documentElement.style.setProperty('--return-header-height', height + 'px');
            }
        });
    return (
        <div ref={returnHeaderRef} className="px-4 flex items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: '10px' }}>
            <button
                className="flex items-center  text-gray-600 hover:text-blue-500 focus:outline-none"
                onClick={() => navigate(-1)}
                aria-label="Quay lại"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="ml-1 text-lg font-medium">Quay lại</span>
            </button>
        </div>
    );
};

export default ReturnHeader;