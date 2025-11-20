

import CustomSelect from "@/components/CustomSelect";
import Select from "@/components/Select";
import React, { useRef } from "react";
import { Box, Icon, Input } from "zmp-ui";
import { useSettings, useWards } from "./useLaborerList";

type Props = {
    filters: any;
    setFilters: (filters: any) => void;
};

const LaborerFilter = ({ filters, setFilters }: Props) => {
    const { settings } = useSettings();
    const { wards } = useWards();
    const [searchValue, setSearchValue] = React.useState(filters.keyword || "");
    const debounceTimeout = useRef<number | null>(null);

    // Reset all filters and search
    const handleReset = () => {
        setSearchValue("");
        setFilters({ job: "", ward: "", age: "", gender: "", keyword: "" });
    };

    // Handle search bar change with debounce
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = globalThis.setTimeout(() => {
            setFilters({ ...filters, keyword: value });
        }, 400); // 400ms debounce
    };
    
    // Single selects config
    const selects = [
        {
            key: "job",
            label: "Công việc",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListJob) ? settings.ListJob : [])],
            placeholder: "Ngành đào tạo"
        },
        {
            key: "ward",
            label: "Địa điểm",
            options: [{ label: "Tất cả", value: "" }, ...wards.map(w => ({ label: w.text, value: w.value }))],
            placeholder: "Địa điểm"
        },
        {
            key: "age",
            label: "Độ tuổi",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListAge) ? settings.ListAge : [])],
            placeholder: "Độ tuổi"
        },
        {
            key: "gender",
            label: "Giới tính",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : [])],
            placeholder: "Giới tính"
        },
    ];

    // Horizontal scroll logic
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-2 bg-white pt-2 pl-4">
            <div className="relative pr-4">
                <Input
                    type="text"
                    placeholder="Tìm kiếm ứng viên..."
                    autoComplete="off"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="h-11 pr-6"
                    prefix={<Box pl={3} className="text-gray-600"><Icon icon="zi-search" /></Box>}
                />
                        {(searchValue || filters.job || filters.ward || filters.age || filters.gender) && (
                            <button
                                type="button"
                                className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 shadow focus:outline-none transition"
                                onClick={handleReset}
                                aria-label="Xóa tìm kiếm và bộ lọc"
                                style={{ border: "none", padding: 0 }}
                            >
                                <span style={{ fontSize: "1.25rem", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", paddingBottom: 5 }}>×</span>
                            </button>
                        )}
            </div>
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                style={{ scrollBehavior: "smooth" }}
            >
                {selects.map(sel => (
                    <div key={sel.key} className="flex-shrink-0">
                        <Select
                            type="single"
                            options={sel.options}
                            value={filters[sel.key] || ""}
                            onChange={val => setFilters({ ...filters, [sel.key]: val })}
                            placeholder={sel.placeholder}
                            renderButton={({ open, buttonLabel, handleOpen }) => (
                                <CustomSelect
                                    selectedLabel={buttonLabel}
                                    placeholder={sel.placeholder}
                                    open={open}
                                    onClick={handleOpen}
                                    className="flex p-3 mb-4 mt-2 mr-4 rounded-md border border-[#141415]/30 text-sm bg-gray-200"
                                    chevronSize={16}
                                    chevronColor="gray"
                                    labelClassName={filters[sel.key] ? "text-blue-600 font-semibold" : "text-gray-500"}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LaborerFilter;
