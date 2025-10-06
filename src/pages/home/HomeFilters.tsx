import InputBox from "@/components/InputBox";
import SingleSelect from "@/components/SingleSelect";
import React from "react";

const HomeFilters: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">

            <input
                type="text"
                placeholder="Tìm kiếm công việc, địa điểm..."
                className=""
            />
            <div className="flex gap-2">
                <SingleSelect
                    options={[
                        { label: "Công nghệ thông tin", value: "it" },
                        { label: "Kinh doanh", value: "business" },
                        { label: "Tiếp thị", value: "marketing" },
                        { label: "Thiết kế", value: "design" },
                    ]}
                    value={""}
                    placeholder="Ngành nghề"
                    onChange={() => { }}
                />
                <SingleSelect
                    options={[
                        { label: "Dưới 5 triệu", value: "under_5m" },
                        { label: "5 - 10 triệu", value: "5m_10m" },
                        { label: "10 - 15 triệu", value: "10m_15m" },
                        { label: "Trên 15 triệu", value: "above_15m" },
                    ]}
                    value={""}
                    placeholder="Mức lương"
                    onChange={() => { }}
                />
            </div>
        </div>
    );
};

export default HomeFilters;
