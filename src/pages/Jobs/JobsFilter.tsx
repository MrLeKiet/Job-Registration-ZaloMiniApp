import Select from "@/components/Select";
import { useEffect, useRef, useState } from "react";
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

  const [searchValue, setSearchValue] = useState(filters.keyword || "");
  const [searchLoading, setSearchLoading] = useState(false);
  let debounceRef = useRef<number | null>(null);

  useEffect(() => {
    setSearchValue(filters.keyword || "");
  }, [filters.keyword]);

  useEffect(() => {
    if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
    if (searchValue === (filters.keyword || "")) {
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    debounceRef.current = globalThis.setTimeout(() => {
      setFilters({ ...filters, keyword: searchValue });
      setSearchLoading(false);
    }, 2000);
    return () => {
      if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
    };
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-2 mb-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
      <div className="flex relative justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm việc làm..."
          className="bg-white border-opacity-35 border-[#141415]/30 h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6] pr-24" // Added pr-24 for space
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {searchLoading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 animate-pulse">
            Đang tìm...
          </span>
        )}
      </div>
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
