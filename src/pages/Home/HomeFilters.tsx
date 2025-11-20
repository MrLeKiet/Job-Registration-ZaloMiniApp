import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input, useNavigate, Box, Icon } from "zmp-ui";

const HomeFilters: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // Navigate to jobs page with search value as query param
            navigate(`/jobs?keyword=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <div className="flex flex-col gap-2  mb-2 py-2 px-4">
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Tìm kiếm công việc..."
                    autoComplete="off"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                    className="h-11"
                    prefix={<Box pl={4} className="text-gray-600"><Icon icon="zi-search" /></Box>}
                />
            </div>
        </div>
    );
};

export default HomeFilters;
