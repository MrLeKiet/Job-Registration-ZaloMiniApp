import { NavbarVisibilityContext } from "@/layouts/MainLayout";
import { ChevronDown, ChevronUp, Square, SquareCheck, Tally1 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type OptionType = {
    label: string;
    value: string;
};

export type MultiSelectProps = {
    options: OptionType[];
    value: string[];
    onChange: (selected: string[]) => void;
    max?: number;
    placeholder?: string;
    onOpen?: () => void;
    onClose?: () => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    value,
    onChange,
    max = 2,
    placeholder,
    onOpen,
    onClose,
}) => {
    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState<string[]>(value || []); // committed
    const [pendingInternal, setPendingInternal] = React.useState<string[]>(value || []); // temporary while modal open
    const [search, setSearch] = React.useState("");
    const navbarCtx = React.useContext(NavbarVisibilityContext);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null); // Ref for the <ul> element

    // Calculate dynamic height offset based on header and input
    const [heightOffset, setHeightOffset] = useState(100);
    useEffect(() => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight;
            const inputHeight = 50; // Approximate input height, adjust if needed
            setHeightOffset(headerHeight + inputHeight + 20); // Add padding
        }
    }, [open]);

    React.useEffect(() => {
        setInternal(value || []);
        if (!open) setPendingInternal(value || []);
    }, [value]);

    const handleOpen = () => {
        setPendingInternal(internal); // Use committed internal state
        setOpen(true);
        if (navbarCtx) navbarCtx.setShowNavbar(false);
        if (typeof onOpen === 'function') onOpen();
        // Restore scroll position and focus on last selected item after a small delay
        setTimeout(() => {
            if (listRef.current && internal.length > 0) {
                const lastSelectedValue = internal[internal.length - 1]; // Last selected item
                const selectedElement = listRef.current.querySelector(`button[key="${lastSelectedValue}"]`);
                if (selectedElement) {
                    selectedElement.scrollIntoView({ behavior: "auto", block: "nearest" });
                    (selectedElement as HTMLButtonElement).focus();
                }
                const savedScrollPosition = localStorage.getItem("multiSelectScrollPosition");
                if (savedScrollPosition) {
                    listRef.current.scrollTop = parseInt(savedScrollPosition, 10);
                }
            }
        }, 50); // Delay to ensure DOM is ready
    };
    const handleClose = () => {
        setOpen(false);
        if (navbarCtx) navbarCtx.setShowNavbar(true);
        if (typeof onClose === 'function') onClose();
        // Save current scroll position
        if (listRef.current) {
            localStorage.setItem("multiSelectScrollPosition", listRef.current.scrollTop.toString());
        }
    };

    const handleSelect = (optionValue: string) => {
        let next: string[];
        if (pendingInternal.includes(optionValue)) {
            next = pendingInternal.filter((v) => v !== optionValue);
        } else if (pendingInternal.length < max) {
            next = [...pendingInternal, optionValue];
        } else {
            next = pendingInternal;
        }
        setPendingInternal(next);
        // Save scroll position after selection
        if (listRef.current) {
            localStorage.setItem("multiSelectScrollPosition", listRef.current.scrollTop.toString());
        }
    };

    const handleConfirm = () => {
        setInternal(pendingInternal);
        onChange(pendingInternal);
        setOpen(false);
    };

    // --- Refactored to match FilterBar structure ---
    const [renderSheet, setRenderSheet] = React.useState(open);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        let t: any;
        if (open) {
            setRenderSheet(true);
            t = setTimeout(() => setVisible(true), 20);
        } else {
            setVisible(false);
            t = setTimeout(() => setRenderSheet(false), 300);
        }
        return () => clearTimeout(t);
    }, [open]);

    return (
        <>
            <button
                type="button"
                className={`bg-white h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border border-opacity-35 border-[#141415] text-sm transition focus:outline-none focus:ring`}
                onClick={handleOpen}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpen();
                    }
                }}
            >
                <span className={internal.length === 0 ? "text-gray-400" : ""}>
                    {internal.length === 0
                        ? placeholder
                        : options
                            .filter((opt) => internal.includes(opt.value))
                            .map((opt) => opt.label)
                            .join(", ")}
                </span>
                <span className="ml-2 flex items-center text-gray-400">
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
            </button>
            {renderSheet && typeof document !== 'undefined' && createPortal(
                <>
                    <button
                        type="button"
                        aria-label="Đóng menu lựa chọn"
                        tabIndex={0}
                        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={handleClose}
                        style={{ border: "none", padding: 0, margin: 0 }}
                    />
                    <div className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 will-change-transform ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
                        <div className="bg-white rounded-t-2xl shadow-lg p-4 max-h-[calc(50vh-20px)] flex flex-col">
                            <div ref={headerRef}>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold">Chọn ngành nghề (tối đa {max})</span>
                                    <button onClick={handleClose} className="text-2xl leading-none">
                                        &times;
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="w-full mb-3 px-3 py-2 border-gray-300 border-2 rounded focus:outline-none focus:ring"
                                    placeholder="Tìm kiếm..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <ul
                                ref={listRef}
                                className="space-y-1 overflow-y-auto h-[25vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                                style={{ maxHeight: `calc(50vh - ${heightOffset}px)` }}
                            >
                                {options
                                    .filter((option) =>
                                        typeof option.label === "string" &&
                                        option.label.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((option) => {
                                        const isSelected = pendingInternal.includes(option.value);
                                        const isDisabled = !isSelected && pendingInternal.length >= max;
                                        return (
                                            <button
                                                type="button"
                                                key={option.value}
                                                className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                                    ? "text-blue-600 font-semibold bg-blue-50"
                                                    : "cursor-pointer hover:bg-gray-100"
                                                    } ${isDisabled
                                                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                                        : ""}`}
                                                onClick={() => !isDisabled && handleSelect(option.value)}
                                                disabled={isDisabled}
                                                tabIndex={0}
                                            >
                                                <span className="flex-1">{option.label}</span>
                                                {isSelected ? (
                                                    <SquareCheck
                                                        size={20}
                                                        className="text-blue-600 ml-2"
                                                    />
                                                ) : (
                                                    <Square size={20} className="text-gray-400 ml-2" />
                                                )}
                                            </button>
                                        );
                                    })}
                            </ul>
                            <button
                                className="btn-blue w-full mt-4 py-2"
                                onClick={handleConfirm}
                                disabled={pendingInternal.length === 0}
                                type="button"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
};

export default MultiSelect;