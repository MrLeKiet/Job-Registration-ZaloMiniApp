import Select from "@/components/Select";
import React, { useRef } from "react";
import { Box, Icon, Input } from "zmp-ui";
import FilterBar from "../RecruitmentForeigners/FilterBar";
import { useSettings, useWards } from "./useJobsList";

type JobsFilterProps = {
  filters: any;
  setFilters: (filters: any) => void;
  mode: 'job' | 'foreigner';
  setMode: (mode: 'job' | 'foreigner') => void;
};

const JobsFilter = ({ filters, setFilters, mode, setMode }: JobsFilterProps) => {
  const { settings } = useSettings();
  const { wards } = useWards();
  const [searchValue, setSearchValue] = React.useState(filters.keyword || "");
  const debounceTimeout = useRef<number | null>(null);
  const [foreignFilter, setForeignFilter] = React.useState("");

  // Reset all filters and search
  const handleReset = () => {
    setSearchValue("");
    setFilters({ job: "", ward: "", gender: "", salary: "", workingTime: "", keyword: "" });
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
    <div className="flex flex-col gap-2 mb-2 bg-white shadow-sm">
      {/* Toggle buttons for Job and Recruitment Foreigner */}
      <div className="flex mt-2">
        <button
          type="button"
          className={`flex-1 py-1 font-semibold text-base transition ${mode === 'job' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setMode('job')}
        >
          Việc làm
        </button>
        <button
          type="button"
          className={`flex-1 py-1 font-semibold text-base transition ${mode === 'foreigner' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setMode('foreigner')}
        >
          Việc làm ngoài nước
        </button>
      </div>
      <div className="relative pr-4 px-4 pt-2">
        <Input
          type="text"
          placeholder={mode === 'job' ? "Tìm kiếm việc làm..." : "Tìm kiếm doanh nghiệp..."}
          autoComplete="off"
          value={searchValue}
          onChange={handleSearchChange}
          className="h-11 pr-6"
          prefix={<Box pl={3} className="text-gray-600"><Icon icon="zi-search" /></Box>}
        />
        {(searchValue || filters.job || filters.ward || filters.salary || filters.gender || filters.workingTime) && (
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
      {mode === 'job' ? (
        <div
          className="flex overflow-x-auto pl-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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
                  <div className="flex">
                    <button
                      type="button"
                      className="flex p-3 mb-4 mt-2 mr-4 rounded-md border border-[#141415]/30 text-sm bg-gray-200"
                      onClick={handleOpen}
                    >
                      <span className={filters[sel.key] ? "text-blue-600 font-semibold" : "text-gray-500"}>
                        {buttonLabel || sel.placeholder}
                      </span>
                      <span className="ml-2">
                        <svg width="16" height="16" fill="gray" viewBox="0 0 16 16"><path d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/></svg>
                      </span>
                    </button>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-max mb-4">
        </div>
      )}
    </div>
  );
};

export default JobsFilter;
