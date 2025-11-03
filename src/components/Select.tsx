import { NavbarVisibilityContext } from "@/layouts/MainLayout";
import { ChevronDown, ChevronUp, Square, SquareCheck } from "lucide-react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import OptionItem from "./OptionItem";

export type SelectType = "single" | "multi" | "panel";

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectProps {
    type: SelectType;
    options: OptionType[];
    value: string | string[] | Record<string, string>;
    onChange: (selected: any) => void;
    max?: number;
    placeholder?: string;
    onOpen?: () => void;
    onClose?: () => void;
    selects?: Array<{
        key: string;
        label: string;
        options: OptionType[];
        placeholder?: string;
    }>;
    filterKey?: string;
    panelPlaceholder?: string;
    onFiltersChange?: (filters: Record<string, string>) => void;
    status?: "error" | "normal";
    errorText?: string;
}

const Select: React.FC<SelectProps> = ({
    type,
    options,
    value,
    onChange,
    max = 2,
    placeholder,
    onOpen,
    onClose,
    selects,
    filterKey,
    panelPlaceholder = "Tìm kiếm",
    onFiltersChange,
    status,
    errorText,
}) => {
    // Shared state
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const navbarCtx = useContext(NavbarVisibilityContext);
    const headerRef = useRef<HTMLDivElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Height offset for modal
    const [heightOffset, setHeightOffset] = useState(100);
    useEffect(() => {
        if (headerRef.current) {
            const inputHeight = 0;
            setHeightOffset(inputHeight);
        }
    }, [open]);

    // SingleSelect logic
    const [internalSingle, setInternalSingle] = useState<string>(typeof value === "string" ? value : "");
    useEffect(() => {
        if (type === "single") setInternalSingle(typeof value === "string" ? value : "");
    }, [value, type]);

    // MultiSelect logic
    const [internalMulti, setInternalMulti] = useState<string[]>(Array.isArray(value) ? value : []);
    const [pendingMulti, setPendingMulti] = useState<string[]>(Array.isArray(value) ? value : []);
    useEffect(() => {
        if (type === "multi") {
            setInternalMulti(Array.isArray(value) ? value : []);
            if (!open) setPendingMulti(Array.isArray(value) ? value : []);
        }
    }, [value, type, open]);

    // Panel logic
    const getInitialFilters = () => {
        if (!selects) return {};
        const obj: Record<string, string> = {};
        for (const sel of selects) {
            const tatCaOption = sel.options.find(o => o.label === "Tất cả");
            obj[sel.key] = tatCaOption?.value ?? "";
        }
        return obj;
    };
    const [filters, setFilters] = useState<Record<string, string>>(getInitialFilters());
    const [activeSelect, setActiveSelect] = useState(selects?.[0]?.key || "");
    const [truncateLength, setTruncateLength] = useState(50);
    const spanRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (type === "panel" && value && typeof value === "object") {
            setFilters(value as Record<string, string>);
        }
    }, [value, type]);
    // Dynamic truncation length based on span width
    useEffect(() => {
        if (type !== "panel") return;
        const updateTruncateLength = () => {
            if (spanRef.current) {
                const spanWidth = spanRef.current.offsetWidth;
                const avgCharWidth = 8;
                const maxChars = Math.floor(spanWidth / avgCharWidth) - 3;
                setTruncateLength(Math.max(10, maxChars));
            }
        };
        updateTruncateLength();
        window.addEventListener("resize", updateTruncateLength);
        return () => window.removeEventListener("resize", updateTruncateLength);
    }, [type]);

    // Shared open/close logic
    const handleOpen = () => {
        setShowModal(true);
        setTimeout(() => setOpen(true), 10); // allow mount before animate
        if (navbarCtx) navbarCtx.setShowNavbar(false);
        if (typeof onOpen === "function") onOpen();
    };
    const handleClose = () => {
        setOpen(false);
        if (navbarCtx) navbarCtx.setShowNavbar(true);
        if (typeof onClose === "function") onClose();
        if (type === "panel" && selects) {
            setFilters(getInitialFilters());
            setActiveSelect(selects[0]?.key || "");
            setSearch("");
        }
        setTimeout(() => setShowModal(false), 300); // wait for animation
    };

    // SingleSelect select logic
    const handleSingleSelect = (option: string) => {
        if (internalSingle === option) {
            setInternalSingle("");
            onChange("");
        } else {
            setInternalSingle(option);
            onChange(option);
        }
    };

    // MultiSelect select logic
    const handleMultiSelect = (optionValue: string) => {
        let next: string[];
        if (pendingMulti.includes(optionValue)) {
            next = pendingMulti.filter((v) => v !== optionValue);
        } else if (pendingMulti.length < max) {
            next = [...pendingMulti, optionValue];
        } else {
            next = pendingMulti;
        }
        setPendingMulti(next);
    };
    const handleMultiConfirm = () => {
        setInternalMulti(pendingMulti);
        onChange(pendingMulti);
        setOpen(false);
    };

    // Panel select logic
    const updateFilter = (key: string, val: string) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: val };
            if (onFiltersChange) onFiltersChange(newFilters);
            return newFilters;
        });
    };
    // Panel reset filters
    const handleResetFilters = () => {
        if (!selects) return;
        const newFilters: Record<string, string> = {};
        for (const sel of selects) {
            const tatCaOption = sel.options.find(o => o.label === "Tất cả");
            newFilters[sel.key] = tatCaOption?.value ?? "";
        }
        setFilters(newFilters);
        if (onFiltersChange) onFiltersChange(newFilters);
    };

    // Filtering logic
    const filteredOptions = useMemo(() => {
        if (type === "single") {
            return options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()));
        }
        if (type === "multi") {
            return options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()));
        }
        return [];
    }, [search, options, type]);

    // Panel filtered options
    const panelFilteredOptions = useMemo(() => {
        if (!selects) return [];
        // If searching, filter all tabs; else only active tab
        if (search.trim() !== "") {
            return selects.map(sel => ({
                ...sel,
                filtered: sel.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
            }));
        } else {
            const sel = selects.find(s => s.key === activeSelect);
            if (!sel) return [];
            return [{
                ...sel,
                filtered: sel.options
            }];
        }
    }, [search, selects, activeSelect]);

    // Render main button label
    let buttonLabel = placeholder || "Chọn";
    if (type === "single" && internalSingle) {
        const label = options.find(o => o.value === internalSingle)?.label || "";
        // Use dynamic truncation like panel
        if (spanRef.current) {
            buttonLabel = label.length > truncateLength + 10 ? label.slice(0, truncateLength + 10) + "..." : label;
        } else {
            buttonLabel = label;
        }
    }
    if (type === "multi" && internalMulti.length) {
        buttonLabel = options.filter(o => internalMulti.includes(o.value)).map(o => o.label).join(", ");
        // Use dynamic truncation like panel and single
        if (spanRef.current) {
            buttonLabel = buttonLabel.length > truncateLength + 10 ? buttonLabel.slice(0, truncateLength + 10) + "..." : buttonLabel;
        }
    }
    if (type === "panel" && filters && selects) {
        const allSelectedLabels = selects.map(s => s.options.find(o => o.value === filters[s.key])?.label).filter(l => l && l !== "Tất cả") as string[];
        buttonLabel = allSelectedLabels.length ? allSelectedLabels.join(", ") : panelPlaceholder;
        if (type === "panel" && spanRef.current) {
            buttonLabel = buttonLabel.length > truncateLength + 10 ? buttonLabel.slice(0, truncateLength + 10) + "..." : buttonLabel;
        }
    }

    // Main button
    return (
        <>
            <button
                type="button"
                className={`bg-white h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6] ${
                    status === "error" ? "border-[#DC1F18]" : "border-[#141415]/30 border-opacity-35"
                }`}
                onClick={handleOpen}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span
                    className={`whitespace-nowrap overflow-hidden text-ellipsis w-full block text-left ${
                        (type === "single" && !internalSingle) ||
                        (type === "multi" && (!internalMulti || internalMulti.length === 0)) ||
                        (type === "panel" && (!filters || selects?.every(s => !filters[s.key] || filters[s.key] === s.options.find(o => o.label === "Tất cả")?.value)))
                            ? "text-gray-400"
                            : "text-black"
                    }`}
                    style={{ maxWidth: '100%' }}
                >
                    {buttonLabel}
                </span>
                <span className="ml-2 flex items-center text-gray-400">
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
            </button>
            {status === "error" && errorText && (
                <div className="flex items-center text-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.72975 2.28802C7.29427 1.31024 8.70557 1.31024 9.27009 2.28802L14.809 11.8816C15.3735 12.8594 14.6678 14.0816 13.5388 14.0816H2.46104C1.332 14.0816 0.626351 12.8594 1.19087 11.8816L6.72975 2.28802ZM7.37248 5.62619C7.36081 5.28382 7.63519 4.99992 7.97776 4.99992H8.02228C8.36485 4.99992 8.63924 5.28381 8.62757 5.62619L8.50094 9.34061C8.49299 9.57365 8.30177 9.75847 8.06859 9.75847H7.93145C7.69827 9.75847 7.50705 9.57365 7.49911 9.34061L7.37248 5.62619ZM8.70672 11.2906C8.70672 11.6809 8.39032 11.9973 8.00001 11.9973C7.6097 11.9973 7.29329 11.6809 7.29329 11.2906C7.29329 10.9003 7.6097 10.5839 8.00001 10.5839C8.39032 10.5839 8.70672 10.9003 8.70672 11.2906Z" fill="#DC1F18"></path>
                    </svg>
                    <div className="text-[13px] text-[#DC1F18]">{errorText}</div>
                </div>
            )}
            {showModal && typeof document !== 'undefined' && createPortal(
                <>
                    <button
                        type="button"
                        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                        aria-label="Đóng menu lựa chọn"
                        onClick={handleClose}
                        style={{ border: "none", padding: 0, margin: 0 }}
                    />
                    <div
                        className={`fixed top-0 left-0 right-0 z-50 bg-black/70 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                        style={{ height: 'var(--header-height)' }}
                    />
                    <div
                        ref={modalRef}
                        className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 will-change-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[90vh] flex flex-col">
                            {type === "panel" && selects && (
                                <>
                                    <div className="mb-2 text-base font-medium text-gray-700">
                                        <span ref={spanRef}>{buttonLabel}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold">Chọn một lựa chọn</span>
                                        <div className="flex items-center gap-2">
                                            {selects.some(sel => {
                                                const value = filters[sel.key];
                                                const tatCaOption = sel.options.find(o => o.label === "Tất cả");
                                                return tatCaOption ? value !== tatCaOption.value : value !== "";
                                            }) && (
                                                <button
                                                    onClick={handleResetFilters}
                                                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition"
                                                >
                                                    Đặt lại bộ lọc
                                                </button>
                                            )}
                                            <button onClick={handleClose} className="text-2xl leading-none">&times;</button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="bg-white h-12 px-3 w-full mb-3 flex items-center rounded-lg justify-between border border-opacity-35 border-[#141415]/30 text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6]"
                                        placeholder="Tìm kiếm..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 mb-3 gap-5 rounded-lg overflow-hidden border border-gray-200">
                                        {selects.map(sel => (
                                            <button
                                                key={sel.key}
                                                className={`flex-1 py-4 px-4 text-sm font-medium transition-colors ${activeSelect === sel.key ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                                                style={{ borderRight: sel.key === selects.at(-1)?.key ? "none" : "1px solid #e5e7eb" }}
                                                onClick={() => {
                                                    setSearch("");
                                                    setActiveSelect(sel.key);
                                                }}
                                            >
                                                {sel.label}
                                            </button>
                                        ))}
                                    </div>
                                    <ul className="space-y-1 overflow-y-auto h-[33vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}>
                                        {search.trim() === "" ? (
                                            panelFilteredOptions[0]?.filtered.map(opt => (
                                                <OptionItem
                                                    key={opt.value}
                                                    selectKey={panelFilteredOptions[0].key}
                                                    option={opt}
                                                    selected={filters[panelFilteredOptions[0].key] === opt.value}
                                                    onChange={updateFilter}
                                                />
                                            ))
                                        ) : (
                                            selects.map(sel => {
                                                const filtered = sel.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
                                                if (!filtered.length) return null;
                                                return (
                                                    <React.Fragment key={sel.key}>
                                                        <div className="font-semibold text-gray-700 py-2 px-2 bg-gray-50 rounded mt-2 mb-1">
                                                            {sel.label}
                                                        </div>
                                                        {filtered.map(opt => (
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
                                            selects.every(s => !s.options.some(o => o.label.toLowerCase().includes(search.toLowerCase()))) && (
                                                <div className="text-gray-400">Không có kết quả</div>
                                            )}
                                    </ul>
                                </>
                            )}
                            {type === "single" && (
                                <>
                                    <div ref={headerRef}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-semibold">Chọn một lựa chọn</span>
                                            <button onClick={handleClose} className="text-2xl leading-none">&times;</button>
                                        </div>
                                        <input
                                            type="text"
                                            className="bg-white h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border border-opacity-35 border-[#141415]/30 text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6]"
                                            placeholder="Tìm kiếm..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <ul className="space-y-1 overflow-y-auto h-[40vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}>
                                        {filteredOptions.map(option => {
                                            const isSelected = internalSingle === option.value;
                                            return (
                                                <button
                                                    type="button"
                                                    key={option.value}
                                                    className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected ? "text-blue-600 font-semibold bg-blue-50" : "cursor-pointer hover:bg-gray-100"}`}
                                                    onClick={() => handleSingleSelect(option.value)}
                                                    tabIndex={0}
                                                >
                                                    <span className="flex-1">{option.label}</span>
                                                    {isSelected ? (
                                                        <SquareCheck size={20} className="text-blue-600 ml-2" />
                                                    ) : (
                                                        <Square size={20} className="text-gray-400 ml-2" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </ul>
                                </>
                            )}
                            {type === "multi" && (
                                <>
                                    <div ref={headerRef}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-semibold">Chọn ngành nghề (tối đa {max})</span>
                                            <button onClick={handleClose} className="text-2xl leading-none">&times;</button>
                                        </div>
                                        <input
                                            type="text"
                                            className="bg-white h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border border-opacity-35 border-[#141415]/30 text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6]"
                                            placeholder="Tìm kiếm..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <ul className="space-y-1 overflow-y-auto h-[40vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}>
                                        {filteredOptions.map(option => {
                                            const isSelected = pendingMulti.includes(option.value);
                                            const isDisabled = !isSelected && pendingMulti.length >= max;
                                            return (
                                                <button
                                                    type="button"
                                                    key={option.value}
                                                    className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected ? "text-blue-600 font-semibold bg-blue-50" : "cursor-pointer hover:bg-gray-100"} ${isDisabled ? "text-gray-400 bg-gray-100 cursor-not-allowed" : ""}`}
                                                    onClick={() => !isDisabled && handleMultiSelect(option.value)}
                                                    disabled={isDisabled}
                                                    tabIndex={0}
                                                >
                                                    <span className="flex-1">{option.label}</span>
                                                    {isSelected ? (
                                                        <SquareCheck size={20} className="text-blue-600 ml-2" />
                                                    ) : (
                                                        <Square size={20} className="text-gray-400 ml-2" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </ul>
                                    <button
                                        className="btn-blue w-full mt-4 py-2"
                                        onClick={handleMultiConfirm}
                                        disabled={pendingMulti.length === 0}
                                        type="button"
                                    >
                                        Xác nhận
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
};

export default Select;