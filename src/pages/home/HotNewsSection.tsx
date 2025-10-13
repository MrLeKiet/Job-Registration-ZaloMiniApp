import Skeleton from "@/components/Skeleton";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useHotNews } from "./useHome";

const HotNewsSection: React.FC = () => {
    const { news, loading, error } = useHotNews();
    const navigate = useNavigate();
    if (loading) return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap text-primary font-lg font-bold">
                    THÔNG BÁO MỚI NHẤT
                </div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/news")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => {
                    const uniqueKey = `skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`;
                    return (
                        <div key={uniqueKey} className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                            <Skeleton className="min-w-[60px] h-8 mb-1" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-2/3 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;

    function formatDate(dateStr: string) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
        return dateStr;
    }

    function handleNewsClick(id: string) {
        navigate(`/news/${id}`);
    }
    const isEmpty = !Array.isArray(news) || news.length === 0;
    return (
        <div className="mx-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap text-primary font-lg font-bold">
                    THÔNG BÁO MỚI NHẤT
                </div>
                <button
                    className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
                    onClick={() => navigate("/news")}
                >
                    Xem tất cả &gt;
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {isEmpty ? (
                    <div className="text-center text-muted py-8 select-none font-lg">
                        Không có tin tức nào được tìm thấy.
                    </div>
                ) : (
                    news.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="flex gap-3 items-center bg-white/5 rounded p-2 cursor-pointer hover:bg-white/10 w-full text-left"
                            onClick={() => handleNewsClick(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleNewsClick(item.id);
                                }
                            }}
                            tabIndex={0}
                        >
                            <div className="flex flex-col items-center justify-center min-w-[60px]">
                                <div className="bg-[#1565C0] text-white font-sm font-semibold rounded px-2 py-1 mb-1 text-center">
                                    {item.publishdate
                                        ? (() => {
                                            const parts = formatDate(item.publishdate).split("/");
                                            if (parts.length === 3) {
                                                return (
                                                    <>
                                                        {parts[0]}/{parts[1]}
                                                        <hr className="my-1 w-full" />
                                                        <div className="mt-1">{parts[2]}</div>
                                                    </>
                                                );
                                            }
                                            return "--/--";
                                        })()
                                        : "--/--"}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div
                                    className="font-semibold leading-tight mb-1 font-base"
                                    style={{
                                        wordBreak: 'break-word',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item.title}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default HotNewsSection;
