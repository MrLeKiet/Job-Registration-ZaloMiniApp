
import Select from "@/components/Select";
import React from "react";
import { useFilterOptions } from "./useRecruitmentForeigners";

export type FilterBarProps = {
    value: string;
    onChange: (selected: string) => void;
    placeholder?: string;
};

const FilterBar: React.FC<FilterBarProps> = ({ value, onChange, placeholder }) => {

    const { data: options } = useFilterOptions();

    const allOptions = [{ label: "Tất cả", value: "" }, ...(options || [])];
    return (
        <Select
            type="single"
            options={allOptions}
            value={value}
            onChange={onChange}
            placeholder={placeholder || "Chọn doanh nghiệp"}
        />
    );
};

export default FilterBar;
