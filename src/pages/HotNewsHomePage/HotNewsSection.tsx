import Skeleton from "@/components/Skeleton";
import React from "react";
import { useNavigate } from "zmp-ui";
import NewsCard from "./NewsCard";
import { useHotNews } from "./useHotNews";

const HotNewsSection: React.FC = () => {
    const { news, loading, error } = useHotNews();
    const navigate = useNavigate();

    const handleNewsClick = (id: string) => {
        navigate(`/news/${id}`);
    };

    if (loading) return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tin tức nổi bật</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`hotnews-skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`} className="bg-white rounded shadow p-2 flex flex-col">
                        <Skeleton className="w-full h-32 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-1" />
                        <Skeleton className="h-5 w-2/3" />
                    </div>
                ))}
            </div>
        </div>
    );
    if (error) return <div className="text-red-500">Lỗi khi tải tin tức.</div>;
    const isEmpty = !Array.isArray(news) || news.length === 0;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tin tức nổi bật</h1>
            {isEmpty ? (
                <div className="text-center text-muted py-8 select-none font-lg">
                    Không có tin tức nào được tìm thấy.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {news.map((item: any) => (
                        <NewsCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            publishdate={item.publishdate}
                            onClick={handleNewsClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotNewsSection;