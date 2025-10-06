
import MultiSelectPanel from "@/components/MultiSelectPanel";
import { useSettings, useWards } from "./useJobsList";

const JobsFilter = ({ filters, onFilterChange }: any) => {
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
    <MultiSelectPanel selects={selects} values={filters} onChange={onFilterChange} />
  );
};

export default JobsFilter;
