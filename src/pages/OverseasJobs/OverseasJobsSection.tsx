import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import React from "react";
import { useOverseasJobs } from "./useOverseasJobs";
import { useNavigate } from "zmp-ui";

const OverseasJobsSection: React.FC = () => {
    const { items, loading, error } = useOverseasJobs();
    const navigate = useNavigate();
    const handleNewsClick = (id: string) => navigate(`/news/${id}`);
    if (loading) {
        return (
            <SkeletonList
                count={5}
                renderSkeleton={() => (
                    <div className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                        <Skeleton className="w-16 h-16" />
                        <div className="flex-1">
                            <Skeleton className="h-4 w-2/3 mb-2" />
                            <Skeleton className="h-3 w-1/2 mb-1" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                    </div>
                )}
                className="flex flex-col gap-2 mb-2"
            />
        );
    }
    if (error) {
        return <div className="text-red-500">Lỗi khi tải dữ liệu việc làm ngoài nước.</div>;
    }
    if (!items || items.length === 0) {
        return <div className="text-center text-muted py-8 select-none font-lg">Không có dữ liệu việc làm ngoài nước.</div>;
    }
    return (
        <div className="flex flex-col gap-3 mb-2">
            {items.map((item: any) => (
                <Card
                    key={item.id}
                    thumbnail={item.thumbnail}
                    onClick={() => handleNewsClick(item.id)}
                >
                    <div className="flex flex-col">
                        <div className="card-title font-bold line-clamp-2">{item.title}</div>
                    <div className="card-meta">Ngày đăng: {item.publishdate}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default OverseasJobsSection;