import Select from "@/components/Select";
import React, { useRef } from "react";
import { Box, Icon, Input } from "zmp-ui";
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
  // Foreigners search state
  const [foreignSearch, setForeignSearch] = React.useState("");

  // Reset all filters and search
  const handleReset = () => {
    setSearchValue("");
    setFilters({ job: "", ward: "", gender: "", salary: "", workingTime: "", keyword: "" });
  };

  // Handle search bar change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (mode === 'job') {
      setSearchValue(value);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = globalThis.setTimeout(() => {
        setFilters({ ...filters, keyword: value });
      }, 400); // 400ms debounce
    } else {
      setForeignSearch(value);
    }
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
    <div className="flex flex-col bg-white shadow-sm">
      {/* Toggle buttons for Job and Recruitment Foreigner */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setMode('job')}
          className={`flex-1 py-1 px-4 font-semibold text-sm transition-all relative
          ${mode === 'job'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Việc làm trong nước
        </button>
        <button
          type="button"
          onClick={() => setMode('foreigner')}
          className={`flex-1 py-1 px-4 font-semibold text-sm transition-all relative
          ${mode === 'foreigner'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Việc làm nước ngoài
        </button>
      </div>
      {mode === 'job' ? (
        <div>
          <div className="px-4 mt-2">
            <Input
              type="text"
              placeholder={mode === 'job' ? "Tìm kiếm việc làm..." : "Tìm kiếm doanh nghiệp..."}
              autoComplete="off"
              value={mode === 'job' ? searchValue : foreignSearch}
              onChange={handleSearchChange}
              className="h-11 pr-6"
              prefix={<Box pl={3} className="text-gray-600"><Icon icon="zi-search" /></Box>}
            />
          </div>
          <div className="relative pr-4 px-4">
            {(searchValue || filters.job || filters.ward || filters.salary || filters.gender || filters.workingTime) && (
              <button
                type="button"
                className="absolute right-8 -top-[25px] -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 shadow focus:outline-none transition"
                onClick={handleReset}
                aria-label="Xóa tìm kiếm và bộ lọc"
                style={{ border: "none", padding: 0 }}
              >
                <span style={{ fontSize: "1.25rem", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", paddingBottom: 5 }}>×</span>
              </button>
            )}
          </div>
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
                        className="flex px-2 py-1 mb-4 mt-2 mr-4 rounded-md border border-[#141415]/30 text-sm bg-gray-200"
                        onClick={handleOpen}
                      >
                        <span className={filters[sel.key] ? "text-blue-600 font-semibold" : "text-gray-500"}>
                          {buttonLabel || sel.placeholder}
                        </span>
                        <span className="ml-2">
                          <svg width="16" height="16" fill="gray" viewBox="0 0 16 16"><path d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" /></svg>
                        </span>
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
        </div>
      )}
    </div>
  );
};

export default JobsFilter;
