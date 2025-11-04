import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useHotNews } from "./useHome";
import SectionHeader from "@/components/SectionHeader";

function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    return parts.length === 3 ? `${parts[0]}/${parts[1]}/${parts[2]}` : dateStr;
}

const HotNewsSection: React.FC = () => {
    const { news, loading, error } = useHotNews();
    const navigate = useNavigate();

    if (loading) {
        return (
            <section className="mb-2">
                <header className="mb-2 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
                        TIN TỨC NỔI BẬT
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
            </section>
        );
    }

    if (error) return <p className="text-red-600">Có lỗi xảy ra khi tải dữ liệu.</p>;

    const handleNewsClick = (id: string) => navigate(`/news/${id}`);
    const isEmpty = !Array.isArray(news) || news.length === 0;

    return (
        <div className="flex flex-col gap-2">
            <SectionHeader
                title="TIN TỨC NỔI BẬT"
                buttonText="Xem tất cả >"
                onButtonClick={() => navigate("/news")}
            />

            <div className="flex flex-col gap-2">
                {isEmpty ? (
                    <p className="py-8 text-center text-lg text-muted select-none">
                        Không có tin tức nào được tìm thấy.
                    </p>
                ) : (
                    news.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="flex w-full gap-3 items-center rounded bg-white/5 p-2 text-left hover:bg-white/10 focus:outline-none"
                            onClick={() => handleNewsClick(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === "Space") handleNewsClick(item.id);
                            }}
                            tabIndex={0}
                        >
                            <div className="flex flex-col items-center justify-center w-[60px]">
                                <div className="rounded bg-[#1565C0] px-2 py-1 text-center text-sm font-semibold text-white">
                                    {item.publishdate ? (
                                        (() => {
                                            const [d, m, y] = formatDate(item.publishdate).split("/");
                                            return (
                                                <>
                                                    {d}/{m}
                                                    <hr className="my-1 w-full border-white/30" />
                                                    <div className="mt-1">{y}</div>
                                                </>
                                            );
                                        })()
                                    ) : (
                                        "--/--"
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="line-clamp-3 text-base font-semibold leading-tight">
                                    {item.title}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default HotNewsSection;