import { ChevronDown } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import OptionItem from "./OptionItem";

interface Option {
    label: string;
    value: string;
}

interface SelectConfig {
    key: string;
    label: string;
    options: Option[];
    placeholder?: string;
}

interface MultiSelectPanelProps {
    selects: SelectConfig[];
    filterKey: string;
    placeholder?: string;
    onFiltersChange?: (filters: Record<string, string>) => void;
}

//Helper: match search or number inside age range
const filterOption = (label: string, search: string) => {
    const lowerLabel = label.toLowerCase();
    const lowerSearch = search.toLowerCase();

    if (lowerLabel.includes(lowerSearch)) return true;

    const range = /(\d+)[^\d]+(\d+)/.exec(lowerLabel);
    const searchNum = parseInt(lowerSearch, 10);
    if (range && !isNaN(searchNum)) {
        const [_, min, max] = range.map(Number);
        return searchNum >= min && searchNum <= max;
    }

    return false;
};

const MultiSelectPanel: React.FC<MultiSelectPanelProps> = ({
    selects,
    filterKey,
    placeholder = "Tìm kiếm",
    onFiltersChange,
}) => {
    const getInitialFilters = () => {
        // Default: all 'Tất cả'
        const obj: Record<string, string> = {};
        selects.forEach(sel => {
            const tatCaOption = sel.options.find(o => o.label === "Tất cả");
            obj[sel.key] = tatCaOption ? tatCaOption.value : "";
        });
        return obj;
    };
    const [filters, setFilters] = useState<Record<string, string>>(getInitialFilters());
    const [open, setOpen] = useState(false);
    const [activeSelect, setActiveSelect] = useState(selects[0]?.key || "");
    const [search, setSearch] = useState("");
    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
        Object.fromEntries(selects.map(s => [s.key, 10]))
    );

    // Update filters and notify parent
    const updateFilter = (key: string, value: string) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            if (onFiltersChange) onFiltersChange(newFilters);
            return newFilters;
        });
    };

    // Check if any filter is not 'Tất cả'
    const isFiltered = selects.some(sel => {
        const value = filters[sel.key];
        const tatCaOption = sel.options.find(o => o.label === "Tất cả");
        return value !== (tatCaOption ? tatCaOption.value : "");
    });

    // Reset all filters to 'Tất cả' (batch update)
    const handleResetFilters = () => {
        const newFilters: Record<string, string> = {};
        selects.forEach(sel => {
            const tatCaOption = sel.options.find(o => o.label === "Tất cả");
            newFilters[sel.key] = tatCaOption ? tatCaOption.value : "";
        });
        setFilters(newFilters);
        if (onFiltersChange) onFiltersChange(newFilters);
    };

    const listRef = useRef<HTMLUListElement>(null);
    const prevSearchRef = useRef("");
    const prevActiveSelectRef = useRef(activeSelect);
    const prevOpenRef = useRef(false);

    const currentSelect = selects.find(s => s.key === activeSelect);

    const filteredOptions = useMemo(
        () => (currentSelect ? currentSelect.options.filter(o => filterOption(o.label, search)) : []),
        [search, currentSelect]
    );

    //Reset visible count when search or activeSelect changes
    useEffect(() => {
        if (
            search.trim() !== prevSearchRef.current.trim() ||
            activeSelect !== prevActiveSelectRef.current
        ) {
            setVisibleCounts(prev =>
                Object.fromEntries(selects.map(s => [s.key, 10]))
            );
        }
        prevSearchRef.current = search;
        prevActiveSelectRef.current = activeSelect;
    }, [search, activeSelect, selects]);

    //Auto-scroll to selected item when opened
    useEffect(() => {
        if (open && !prevOpenRef.current && listRef.current && currentSelect) {
            const selectedValue = filters[currentSelect.key];
            const idx = filteredOptions.findIndex(o => o.value === selectedValue);
            if (idx >= 0) {
                setTimeout(() => {
                    listRef.current?.children[idx]?.scrollIntoView({ block: "center" });
                }, 0);
            }
        }
        prevOpenRef.current = open;
    }, [open, currentSelect, filteredOptions, filters]);

    //Button label handling
    const allSelectedLabels = selects
        .map(s => s.options.find(o => o.value === filters[s.key])?.label)
        .filter(l => l && l !== "Tất cả") as string[];

    const buttonLabel = useMemo(() => {
        const label = allSelectedLabels.length ? allSelectedLabels.join(", ") : placeholder;
        return label.length > 18 ? label.slice(0, 18) + "..." : label;
    }, [allSelectedLabels, placeholder]);

    //Infinite scroll
    const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
        const el = e.currentTarget;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
            if (search.trim() === "") {
                if (currentSelect) {
                    setVisibleCounts(prev => ({
                        ...prev,
                        [currentSelect.key]: prev[currentSelect.key] + 10,
                    }));
                }
            } else {
                selects.forEach(s => {
                    const filtered = s.options.filter(o => filterOption(o.label, search));
                    if (visibleCounts[s.key] < filtered.length) {
                        setVisibleCounts(prev => ({
                            ...prev,
                            [s.key]: prev[s.key] + 10,
                        }));
                    }
                });
            }
        }
    };

    return (
        <>
            {/* Main Button */}
            <button
                type="button"
                className="bg-white h-8 w-full flex items-center rounded-lg justify-between px-3 border border-gray-300 text-sm transition focus:outline-none focus:ring"
                onClick={() => setOpen(true)}
                aria-expanded={open}
            >
                <span
                    className={`${allSelectedLabels.length ? "" : "text-gray-400"} whitespace-nowrap overflow-hidden text-ellipsis w-full block text-left`}
                >
                    {buttonLabel}
                </span>
                <ChevronDown size={14} className="ml-2 text-gray-400" />
            </button>


            {/* Overlay */}
            <button
                type="button"
                aria-label="Đóng menu lựa chọn"
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Bottom Sheet */}
            <div
                className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[70vh] flex flex-col justify-between">
                    <div>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Chọn một lựa chọn</span>
                            <div className="flex items-center gap-2">
                                {isFiltered && (
                                    <button
                                        onClick={handleResetFilters}
                                        className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition"
                                    >
                                        Đặt lại bộ lọc
                                    </button>
                                )}
                                <button onClick={() => setOpen(false)} className="text-2xl leading-none">
                                    &times;
                                </button>
                            </div>
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            className="w-full mb-3 px-3 py-2 border-gray-300 border-2 rounded focus:outline-none focus:ring"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        {/* Selected Summary */}
                        <div className="mb-2 text-base font-medium text-gray-700">
                            {allSelectedLabels.length ? allSelectedLabels.join(", ") : "Chưa chọn"}
                        </div>

                        {/* Tabs */}
                        <div className="flex mb-3 rounded-lg overflow-hidden border border-gray-200">
                            {selects.map(sel => (
                                <button
                                    key={sel.key}
                                    className={`flex-1 py-2 px-2 text-sm font-medium transition-colors ${activeSelect === sel.key
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-700"
                                        }`}
                                    style={{
                                        borderRight:
                                            sel.key !== selects[selects.length - 1].key
                                                ? "1px solid #e5e7eb"
                                                : "none",
                                    }}
                                    onClick={() => {
                                        setSearch("");
                                        setActiveSelect(sel.key);
                                    }}
                                >
                                    {sel.label}
                                </button>
                            ))}
                        </div>

                        {/* Options List */}
                        <ul ref={listRef} className="space-y-1 overflow-y-auto max-h-[28vh]" onScroll={handleScroll}>
                            {search.trim() === "" ? (
                                currentSelect &&
                                filteredOptions
                                    .slice(0, visibleCounts[currentSelect.key])
                                    .map(opt => (
                                            <OptionItem
                                                key={opt.value}
                                                selectKey={currentSelect.key}
                                                option={opt}
                                                selected={filters[currentSelect.key] === opt.value}
                                                onChange={updateFilter}
                                            />
                                    ))
                            ) : (
                                selects.map(sel => {
                                    const filtered = sel.options.filter(o => filterOption(o.label, search));
                                    if (!filtered.length) return null;
                                    return (
                                        <React.Fragment key={sel.key}>
                                            <div className="font-semibold text-gray-700 py-2 px-2 bg-gray-50 rounded mt-2 mb-1">
                                                {sel.label}
                                            </div>
                                            {filtered
                                                .slice(0, visibleCounts[sel.key])
                                                .map(opt => (
                                                        <OptionItem
                                                            key={opt.value}
                                                            selectKey={sel.key}
                                                            option={opt}
                                                            selected={filters[sel.key] === opt.value}
                                                            onChange={updateFilter}
                                                        />
                                                ))}
                                        </React.Fragment>
                                    );
                                })
                            )}
                            {search.trim() !== "" &&
                                selects.every(s => !s.options.some(o => filterOption(o.label, search))) && (
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
