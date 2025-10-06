
import MultiSelectPanel from "@/components/MultiSelectPanel";
import { useSettings, useWards } from "./useJobsList";

const JobsFilter = ({ filters, onFilterChange }: { filters: any, onFilterChange: (key: string, value: string) => void }) => {
  const { settings } = useSettings();
  const { wards } = useWards();
  const selects = [
    {
      key: "job",
      label: "Ngành nghề",
      options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListJob) ? settings.ListJob : [])],
      placeholder: "Chọn ngành nghề"
    },
    {
      key: "ward",
      label: "Địa điểm",
      options: [{ label: "Tất cả", value: "" }, ...wards.map(w => ({ label: w.text, value: w.value }))],
      placeholder: "Chọn địa điểm"
    },
    {
      key: "salary",
      label: "Mức lương",
      options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListSalary) ? settings.ListSalary : [])],
      placeholder: "Chọn mức lương"
    },
    {
      key: "gender",
      label: "Giới tính",
      options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : [])],
      placeholder: "Chọn giới tính"
    },
    {
      key: "workingTime",
      label: "Loại công việc",
      options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListWorkingTime) ? settings.ListWorkingTime : [])],
      placeholder: "Chọn loại công việc"
    },
  ];
  return (
    <div className="flex flex-col gap-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
      <input
        type="text"
        placeholder="Tìm kiếm việc làm..."
        className="bg-white h-8 w-full rounded-lg px-3 border border-gray-300 text-sm transition focus:outline-none focus:ring"
        value={filters.keyword || ""}
        onChange={e => onFilterChange("keyword", e.target.value)}
      />
      <div className="w-full">
        <MultiSelectPanel selects={selects} values={filters} onChange={onFilterChange} />
      </div>
    </div>
  );
};

export default JobsFilter;
