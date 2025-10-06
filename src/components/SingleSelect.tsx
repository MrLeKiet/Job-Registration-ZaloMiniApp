import { NavbarVisibilityContext } from "@/layouts/MainLayout";
import { ChevronDown, ChevronUp, Square, SquareCheck } from "lucide-react";
import React from "react";

export type SingleSelectProps = {
    options: { value: string; label: string }[];
    value: string;
    onChange: (selected: string) => void;
    placeholder?: string;
    onOpen?: () => void;
    onClose?: () => void;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
    onOpen,
    onClose,
}) => {
    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState(value || "");
    const [search, setSearch] = React.useState("");
    const navbarCtx = React.useContext(NavbarVisibilityContext);

    React.useEffect(() => {
        setInternal(value || "");
    }, [value]);

    const handleOpen = () => {
        setOpen(true);
        if (navbarCtx) navbarCtx.setShowNavbar(false);
        if (typeof onOpen === 'function') onOpen();
    };
    const handleClose = () => {
        setOpen(false);
        if (navbarCtx) navbarCtx.setShowNavbar(true);
        if (typeof onClose === 'function') onClose();
    };

    const handleSelect = (option: string) => {
        if (internal === option) {
            setInternal("");
            onChange("");
        } else {
            setInternal(option);
            onChange(option);
        }
    };

    return (
        <>
            <button
                type="button"
                className={`bg-white h-8 w-full flex items-center rounded-lg justify-between px-3 border border-gray-300 text-sm transition focus:outline-none focus:ring`}
                onClick={open ? handleClose : handleOpen}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open ? handleClose() : handleOpen();
                    }
                }}
            >
                <span
                    className={`${value ? "" : "text-gray-400"} whitespace-nowrap overflow-hidden text-ellipsis w-full block text-left`}
                    style={{ maxWidth: '100%' }}
                >
                    {value ? (() => {
                        const label = options.find((o) => o.value === value)?.label || "";
                        const maxLen = 18;
                        return label.length > maxLen ? label.slice(0, maxLen) + "..." : label;
                    })() : placeholder}
                </span>
                <span className="ml-2 flex items-center text-gray-400">
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
            </button>
            <button
                type="button"
                aria-label="Đóng menu lựa chọn"
                tabIndex={open ? 0 : -1}
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={handleClose}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClose();
                    }
                }}
                style={{ border: "none", padding: 0, margin: 0 }}
            />
            <div
                className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[55vh] justify-between flex flex-col">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Chọn một lựa chọn</span>
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
                        <ul className="space-y-1 overflow-y-auto h-[40vh]">
                            {options
                                .filter((option) =>
                                    typeof option.label === "string" &&
                                    option.label.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((option) => {
                                    const isSelected = internal === option.value;
                                    return (
                                        <button
                                            type="button"
                                            key={option.value}
                                            className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                                ? "text-blue-600 font-semibold bg-blue-50"
                                                : "cursor-pointer hover:bg-gray-100"
                                                }`}
                                            onClick={() => handleSelect(option.value)}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleSelect;
