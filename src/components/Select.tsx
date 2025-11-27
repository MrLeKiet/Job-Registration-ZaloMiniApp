import { NavbarVisibilityContext } from "@/layouts/MainLayout";
import { ChevronDown, ChevronUp, Square, SquareCheck } from "lucide-react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
    renderButton?: (props: {
        open: boolean;
        buttonLabel: string;
        handleOpen: () => void;
        status?: "error" | "normal";
        errorText?: string;
    }) => React.ReactNode;
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
    status,
    errorText,
    renderButton,
}) => {
    // Shared state
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const navbarCtx = useContext(NavbarVisibilityContext);
    const headerRef = useRef<HTMLDivElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);

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
    handleClose();
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

    // Render main button label
    let buttonLabel = placeholder || "Chọn";
    if (type === "single" && internalSingle) {
        const label = options.find(o => o.value === internalSingle)?.label || "";
        buttonLabel = label;
    }
    if (type === "multi" && internalMulti.length) {
        buttonLabel = options.filter(o => internalMulti.includes(o.value)).map(o => o.label).join(", ");
    }

    // Main button
    return (
        <>
            {renderButton ? (
                renderButton({
                    open,
                    buttonLabel,
                    handleOpen,
                    status,
                    errorText,
                })
            ) : (
                <button
                    type="button"
                    className={`bg-white h-11 px-3 w-full mb-1 flex items-center rounded-lg justify-between border text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6] ${
                        status === "error" ? "border-[#DC1F18]" : "border-[#141415]/30 border-opacity-35"
                    }`}
                    onClick={handleOpen}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                >
                    <span
                        className={`whitespace-nowrap overflow-hidden text-ellipsis w-full block text-left ${
                            (type === "single" && !internalSingle) ||
                            (type === "multi" && (!internalMulti || internalMulti.length === 0))
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
            )}
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
                        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                        style={{ height: 'var(--header-height)' }}
                    />
                    <div
                        ref={modalRef}
                        className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 will-change-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[65vh] flex flex-col">
                            {/* Panel select removed */}
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
                                    <ul className="space-y-1 overflow-y-auto h-[50vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}>
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
                                    <ul className="space-y-1 overflow-y-auto h-[45vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}>
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
                                        className="bg-blue-500 text-white w-full py-3 mt-3 rounded-md hover:bg-blue-600"
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