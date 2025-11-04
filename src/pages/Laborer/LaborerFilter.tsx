

import Select from "@/components/Select";
import { useSettings, useWards } from "./useLaborerList";

type Props = {
    filters: any;
    setFilters: (filters: any) => void;
};

const LaborerFilter = ({ filters, setFilters }: Props) => {
    const { settings } = useSettings();
    const { wards } = useWards();
    const selects = [
        {
            key: "job",
            label: "Ngành đào tạo",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListJob) ? settings.ListJob : [])],
            placeholder: "Chọn ngành đào tạo"
        },
        {
            key: "ward",
            label: "Địa điểm",
            options: [{ label: "Tất cả", value: "" }, ...wards.map(w => ({ label: w.text, value: w.value }))],
            placeholder: "Chọn địa điểm"
        },
        {
            key: "age",
            label: "Độ tuổi",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListAge) ? settings.ListAge : [])],
            placeholder: "Chọn độ tuổi"
        },
        {
            key: "gender",
            label: "Giới tính",
            options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : [])],
            placeholder: "Chọn giới tính"
        },
    ];
    return (
        <div className="flex flex-col gap-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
            <div className="flex gap-2">
                <div className="w-full">
                    <Select
                        type="panel"
                        options={[]} // not used in panel mode
                        onChange={() => {}} // not used in panel mode
                        selects={selects}
                        filterKey="laborerFilters"
                        value={filters}
                        onFiltersChange={newFilters => setFilters({ ...filters, ...newFilters })}
                    />
                </div>
            </div>
        </div>
    );
};

export default LaborerFilter;
