
import { ChevronDown, Square, SquareCheck, Tally1 } from "lucide-react";
import React, { useState } from "react";

interface SelectConfig {
    key: string;
    label: string;
    options: Array<{ label: string; value: string }>;
    placeholder?: string;
}

interface MultiSelectPanelProps {
    selects: SelectConfig[];
    values: Record<string, string>;
    onChange: (key: string, value: string) => void;
    placeholder?: string;
}

const MultiSelectPanel: React.FC<MultiSelectPanelProps> = ({ selects, values, onChange, placeholder }) => {
    // Pagination state for each select
    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
        const obj: Record<string, number> = {};
        selects.forEach(sel => { obj[sel.key] = 10; });
        return obj;
    });

    const [open, setOpen] = useState(false); // Keep this declaration
    const [activeSelect, setActiveSelect] = useState<string>(selects[0]?.key || ""); // Keep this declaration
    const [search, setSearch] = useState(""); // Keep this declaration
    // Reset visible count when switching select or search
    React.useEffect(() => {
        setVisibleCounts(prev => {
            const obj = { ...prev };
            selects.forEach(sel => { obj[sel.key] = 10; });
            return obj;
        });
    }, [activeSelect, search, selects]);

    // Helper: match age range like "20-24" if user types "23"
    function filterOption(label: string, search: string) {
        const lowerLabel = label.toLowerCase();
        const lowerSearch = search.toLowerCase();
        if (lowerLabel.includes(lowerSearch)) return true;
        // Age range logic: match if search is a number inside range
        const ageRangeMatch = /(\d+)[^\d]+(\d+)/.exec(lowerLabel);
        const searchNum = parseInt(lowerSearch, 10);
        if (ageRangeMatch && !isNaN(searchNum)) {
            const min = parseInt(ageRangeMatch[1], 10);
            const max = parseInt(ageRangeMatch[2], 10);
            if (searchNum >= min && searchNum <= max) return true;
        }
        return false;
    }

    const currentSelect = selects.find(s => s.key === activeSelect);
    const filteredOptions = currentSelect
        ? currentSelect.options.filter(opt => filterOption(opt.label, search))
        : [];

    const selectedLabels = selects
        .map(sel => sel.options.find(opt => opt.value === values[sel.key])?.label)
        .filter(label => !!label);

    const allSelectedLabels = selects
        .map(sel => sel.options.find(opt => opt.value === values[sel.key])?.label)
        .filter(label => !!label && label !== "Tất cả");
    let buttonLabel = allSelectedLabels.length > 0
        ? allSelectedLabels.join(", ")
        : (placeholder || "Tìm kiếm");
    // Truncate with ellipsis if too long
    const maxLabelLength = 30;
    if (buttonLabel.length > maxLabelLength) {
        buttonLabel = buttonLabel.slice(0, maxLabelLength - 3) + "...";
    }

    return (
        <>
            <button
                type="button"
                className="bg-white h-12 w-full flex items-center rounded-lg justify-between px-3 border border-gray-200 text-base font-medium transition focus:outline-none shadow-sm"
                onClick={() => setOpen(true)}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={allSelectedLabels.length > 0 ? "text-black" : "text-gray-400"}>{buttonLabel}</span>
                <span className="ml-2 flex items-center text-gray-400">
                    <Tally1 size={18} />
                    <ChevronDown size={18} />
                </span>
            </button>
            {/* Overlay */}
            <button
                type="button"
                aria-label="Đóng menu lựa chọn"
                tabIndex={open ? 0 : -1}
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setOpen(false)}
                style={{ border: "none", padding: 0, margin: 0 }}
            />
            {/* Bottom Sheet Modal */}
            <div
                className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[55vh] justify-between flex flex-col">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Chọn một lựa chọn</span>
                            <button onClick={() => setOpen(false)} className="text-2xl leading-none">&times;</button>
                        </div>
                        {/* Search Bar on top */}
                        <input
                            type="text"
                            className="w-full mb-1 px-3 py-2 border-gray-300 border-2 rounded focus:outline-none focus:ring"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {/* Selected labels row */}
                        <div className="mb-2 text-base font-medium text-gray-700">
                            {allSelectedLabels.length > 0
                                ? allSelectedLabels.join(", ")
                                : "Chưa chọn"}
                        </div>
                        {/* Segmented Tabs for each select */}
                        <div className="flex mb-3 rounded-lg overflow-hidden border border-gray-200">
                            {selects.map(sel => (
                                <button
                                    key={sel.key}
                                    className={`flex-1 py-2 px-2 text-sm font-medium transition-colors ${activeSelect === sel.key ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                                    style={{ borderRight: sel.key !== selects[selects.length - 1].key ? "1px solid #e5e7eb" : "none" }}
                                    onClick={() => {
                                        setSearch("");
                                        setActiveSelect(sel.key);
                                    }}
                                >
                                    {sel.label}
                                </button>
                            ))}
                        </div>
                        <ul
                            className="space-y-1 overflow-y-auto max-h-[28vh]"
                            onScroll={e => {
                                const el = e.currentTarget;
                                if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
                                    if (search.trim() === "") {
                                        if (currentSelect && visibleCounts[currentSelect.key] < filteredOptions.length) {
                                            setVisibleCounts(prev => ({ ...prev, [currentSelect.key]: prev[currentSelect.key] + 10 }));
                                        }
                                    } else {
                                        selects.forEach(sel => {
                                            const filtered = sel.options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()));
                                            if (visibleCounts[sel.key] < filtered.length) {
                                                setVisibleCounts(prev => ({ ...prev, [sel.key]: prev[sel.key] + 10 }));
                                            }
                                        });
                                    }
                                }
                            }}
                        >
                            {search.trim() === ""
                                ? (
                                    currentSelect && filteredOptions.slice(0, visibleCounts[currentSelect.key]).map(opt => {
                                        const isSelected = values[currentSelect.key] === opt.value;
                                        return (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                                    ? "text-blue-600 font-semibold bg-blue-50"
                                                    : "cursor-pointer hover:bg-gray-100"
                                                    }`}
                                                onClick={() => {
                                                    onChange(currentSelect.key, opt.value);
                                                }}
                                                tabIndex={0}
                                            >
                                                <span className="flex-1">{opt.label}</span>
                                                {isSelected ? (
                                                    <SquareCheck size={20} className="text-blue-600 ml-2" />
                                                ) : (
                                                    <Square size={20} className="text-gray-400 ml-2" />
                                                )}
                                            </button>
                                        );
                                    })
                                ) : (
                                    selects.map(sel => {
                                        const filtered = sel.options.filter(opt =>
                                            filterOption(opt.label, search)
                                        );
                                        if (filtered.length === 0) return null;
                                        return (
                                            <React.Fragment key={sel.key}>
                                                <div className="font-semibold text-gray-700 py-2 px-2 bg-gray-50 rounded mt-2 mb-1">{sel.label}</div>
                                                {filtered.slice(0, visibleCounts[sel.key]).map(opt => {
                                                    const isSelected = values[sel.key] === opt.value;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={opt.value}
                                                            className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                                                ? "text-blue-600 font-semibold bg-blue-50"
                                                                : "cursor-pointer hover:bg-gray-100"
                                                                }`}
                                                            onClick={() => {
                                                                onChange(sel.key, opt.value);
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <span className="flex-1">{opt.label}</span>
                                                            {isSelected ? (
                                                                <SquareCheck size={20} className="text-blue-600 ml-2" />
                                                            ) : (
                                                                <Square size={20} className="text-gray-400 ml-2" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </React.Fragment>
                                        );
                                    })
                                )
                            }
                            {search.trim() !== "" && selects.every(sel => sel.options.filter(opt => filterOption(opt.label, search)).length === 0) && (
                                <div className="text-gray-400">Không có kết quả</div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiSelectPanel;
