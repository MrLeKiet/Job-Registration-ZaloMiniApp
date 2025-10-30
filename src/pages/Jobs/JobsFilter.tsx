import Searchbar from "@/components/Searchbar";
import Select from "@/components/Select";
import { useSettings, useWards } from "./useJobsList";

type Props = {
  filters: any;
  setFilters: (filters: any) => void;
};

const JobsFilter = ({ filters, setFilters }: Props) => {
  const { settings } = useSettings();
  const { wards } = useWards();

  const selects = [
    {
      key: "job",
      label: "Ngành nghề",
      options: [
        { label: "Tất cả", value: "" },
        ...(Array.isArray(settings.ListJob) ? settings.ListJob : []),
      ],
      placeholder: "Chọn ngành nghề",
    },
    {
      key: "ward",
      label: "Địa điểm",
      options: [
        { label: "Tất cả", value: "" },
        ...wards.map((w) => ({ label: w.text, value: w.value })),
      ],
      placeholder: "Chọn địa điểm",
    },
    {
      key: "salary",
      label: "Mức lương",
      options: [
        { label: "Tất cả", value: "" },
        ...(Array.isArray(settings.ListSalary) ? settings.ListSalary : []),
      ],
      placeholder: "Chọn mức lương",
    },
    {
      key: "gender",
      label: "Giới tính",
      options: [
        { label: "Tất cả", value: "" },
        ...(Array.isArray(settings.ListGenderSearch)
          ? settings.ListGenderSearch
          : []),
      ],
      placeholder: "Chọn giới tính",
    },
    {
      key: "workingTime",
      label: "Công việc",
      options: [
        { label: "Tất cả", value: "" },
        ...(Array.isArray(settings.ListWorkingTime)
          ? settings.ListWorkingTime
          : []),
      ],
      placeholder: "Chọn loại công việc",
    },
  ];


  return (
    <div className="flex flex-col gap-2 mb-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
      <Searchbar
        value={filters.keyword || ""}
        onSearch={val => setFilters({ ...filters, keyword: val })}
        placeholder="Tìm kiếm việc làm..."
        debounce={2000}
      />
      <div className="flex gap-2">
        <div className="w-full">
          <Select
            type="panel"
            options={[]} // not used in panel mode
            onChange={() => { }} // not used in panel mode
            selects={selects}
            filterKey="jobsFilters"
            value={filters}
            onFiltersChange={newFilters => setFilters({ ...filters, ...newFilters })}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;
