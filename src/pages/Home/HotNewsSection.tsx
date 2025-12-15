import SectionHeader from "@/components/SectionHeader";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useHotNews } from "./useHome";

function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    return parts.length === 3 ? `${parts[0]}/${parts[1]}/${parts[2]}` : dateStr;
}

const HotNewsSection: React.FC = () => {
    const [visibleCount, setVisibleCount] = React.useState(3);
    const { news, loading, error } = useHotNews();
    const navigate = useNavigate();

    if (loading) {
        return (
            <section className="flex flex-col px-4 gap-2">
                <header className="mb-2 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
                        Tin tức
                    </h2>
                    <button
                        className="whitespace-nowrap rounded px-3 py-1 text-xs font-semibold text-primary"
                        onClick={() => navigate("/news")}
                    >
                        Xem tất cả &gt;
                    </button>
                </header>

                <SkeletonList
                    count={3}
                    renderSkeleton={() => (
                        <div className="flex w-full gap-3 p-4 rounded-lg shadow border border-gray-200 bg-white">
                            <div className="flex flex-col items-center justify-center flex-shrink-0">
                                <Skeleton className="object-cover w-[80px] h-[80px] rounded" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <Skeleton className="h-5 w-3/4 mb-2 rounded" />
                                <Skeleton className="h-4 w-1/2 rounded" />
                            </div>
                        </div>
                    )}
                    className="flex flex-col gap-3 mb-2"
                />
            </section>
        );
    }

    if (error) return <p className="text-red-600">Có lỗi xảy ra khi tải dữ liệu.</p>;

    const handleNewsClick = (id: string) => navigate(`/news/${id}`);
    const isEmpty = !Array.isArray(news) || news.length === 0;
    const canLoadMore = news.length > visibleCount;

    return (
        <div className="flex flex-col px-4 gap-2">
            <SectionHeader
                title="Tin tức"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/news")}
            />

            <div className="flex flex-col gap-3">
                {isEmpty ? (
                    <p className="py-8 text-center text-lg text-muted select-none">
                        Không có tin tức nào được tìm thấy.
                    </p>
                ) : (
                    news.slice(0, visibleCount).map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="flex w-full gap-3 p-4 rounded-lg shadow border border-gray-200 bg-white text-left hover:bg-white/10 focus:outline-none"
                            onClick={() => handleNewsClick(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === "Space") handleNewsClick(item.id);
                            }}
                            tabIndex={0}
                        >
                            <div className="flex flex-col items-center justify-center flex-shrink-0">
                                {item.thumbnail && (
                                    <img src={item.thumbnail} alt={item.title} className="object-cover w-[80px] h-[80px]  rounded" />
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="line-clamp-3 text-sm font-semibold leading-tight">
                                    {item.title}
                                </p>
                                <p className="text-xs text-muted text-gray-500">{item.publishdate}</p>
                            </div>
                        </button>
                    ))
                )}
            </div>
            {canLoadMore && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-blue-700 text-sm font-semibold px-3 py-1 rounded hover:underline bg-transparent border-none cursor-pointer"
                        onClick={() => setVisibleCount((prev) => prev + 3)}
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );
};

export default HotNewsSection;