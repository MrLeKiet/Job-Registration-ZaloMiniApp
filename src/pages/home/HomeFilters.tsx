import SingleSelect from "@/components/SingleSelect";
import React from "react";
const HomeFilters: React.FC = () => {
    const [job, setJob] = React.useState("");
    const [salary, setSalary] = React.useState("");
    return (
        <div className="flex flex-col gap-2 sticky top-0 z-30 bg-white p-2 shadow-sm">
            <input
                type="text"
                placeholder="Tìm kiếm công việc, địa điểm..."
                className="bg-white h-8 w-full rounded-lg px-3 border border-gray-300 text-sm transition focus:outline-none focus:ring"
            />
            <div className="flex gap-2">
                <div className="w-1/2">
                    <SingleSelect
                        options={[
                            { label: "Công nghệ thông tin", value: "it" },
                            { label: "Kinh doanh", value: "business" },
                            { label: "Tiếp thị", value: "marketing" },
                            { label: "Thiết kế", value: "design" },
                        ]}
                        value={job}
                        placeholder="Ngành nghề"
                        onChange={setJob}
                    />
                </div>
                <div className="w-1/2">
                    <SingleSelect
                        options={[
                            { label: "Dưới 5 triệu", value: "under_5m" },
                            { label: "5 - 10 triệu", value: "5m_10m" },
                            { label: "10 - 15 triệu", value: "10m_15m" },
                            { label: "Trên 15 triệu", value: "above_15m" },
                        ]}
                        value={salary}
                        placeholder="Mức lương"
                        onChange={setSalary}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeFilters;
