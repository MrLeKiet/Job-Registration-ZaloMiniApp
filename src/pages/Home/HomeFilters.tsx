import { Briefcase, Search, Users } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input, useNavigate } from "zmp-ui";
import { useHomeSearch } from "./useHome";

const HomeFilters: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showPanel, setShowPanel] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const debounceRef = useRef<number | null>(null);
    const navigate = useNavigate();

    // Debounce logic (2s)
    React.useEffect(() => {
        if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
        if (!searchValue) {
            setDebouncedValue("");
            setIsTyping(false);
            return;
        }
        setIsTyping(true);
        debounceRef.current = globalThis.setTimeout(() => {
            setDebouncedValue(searchValue);
            setIsTyping(false);
        }, 2000);
        return () => {
            if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
        };
    }, [searchValue]);

    const handleFocus = () => setShowPanel(true);

    const { results, loading } = useHomeSearch(debouncedValue);

    return (
        <>
            {showPanel && (
                <button
                    type="button"
                    className="fixed inset-0 bg-opacity-20 z-20"
                    aria-label="Close search panel"
                    tabIndex={0}
                    onClick={() => setShowPanel(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setShowPanel(false);
                        }
                    }}
                    style={{ cursor: "pointer" }}
                />
            )}
            <div
                className="flex flex-col gap-2 mb-2 sticky top-0 z-30 bg-white p-2"
            >
                {/* Wrap input and dropdown inside a relative container */}
                <div className="relative w-full">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm công việc, địa điểm..."
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                setShowPanel(true);
                            }}
                            onFocus={handleFocus}
                            autoComplete="off"
                        />
                    </div>

                    {/* Dropdown Panel */}
                    {showPanel && (searchValue.trim() || debouncedValue.trim()) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-40 max-h-96 overflow-auto">
                            {(isTyping || loading) ? (
                                <div className="p-4 text-center text-blue-600 animate-pulse text-sm">
                                    Đang tìm...
                                </div>
                            ) : (
                                <>
                                    {results.jobs.length === 0 &&
                                        results.foreigners.length === 0 ? (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            Không tìm thấy kết quả phù hợp.
                                        </div>
                                    ) : (
                                        <>
                                            {results.jobs.length > 0 && (
                                                <div>
                                                    <div className="px-4 py-2 text-xs font-semibold text-primary flex items-center gap-2 border-b border-gray-100">
                                                        <Briefcase size={14} /> Công việc
                                                    </div>
                                                    {results.jobs.map((job) => (
                                                        <button
                                                            key={job.id || job.jobId}
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-100 active:bg-gray-200 text-sm transition-colors"
                                                            onClick={() => {
                                                                navigate(`/jobs/${job.id || job.jobId}`);
                                                                setShowPanel(false);
                                                            }}
                                                        >
                                                            <div className="font-semibold text-primary line-clamp-1">
                                                                {job.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500 line-clamp-1">
                                                                {job.location || "Chưa cập nhật"}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {results.foreigners.length > 0 && (
                                                <div>
                                                    <div className="px-4 py-2 text-xs font-semibold text-primary flex items-center gap-2 border-b border-gray-100">
                                                        <Users size={14} /> Người nước ngoài
                                                    </div>
                                                    {results.foreigners.map((f) => (
                                                        <button
                                                            key={f.id}
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-100 active:bg-gray-200 text-sm transition-colors"
                                                            onClick={() => {
                                                                navigate(`/recruitment-foreigners/${f.id}`);
                                                                setShowPanel(false);
                                                            }}
                                                        >
                                                            <div className="font-semibold text-primary line-clamp-1">
                                                                {f.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500 line-clamp-1">
                                                                {f.company || "Chưa cập nhật"}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomeFilters;
