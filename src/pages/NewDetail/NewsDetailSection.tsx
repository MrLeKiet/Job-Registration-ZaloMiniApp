import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useNewDetail } from "./useNewDetail";

function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateStr;
}

function decodeHtml(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function decodeAndFixImages(html: string) {
    const decoded = decodeHtml(html);
    const imageBaseUrl = import.meta.env.VITE_API_IMAGE_URL;
    return decoded.replace('src="/FileStorage', `src="${imageBaseUrl}/FileStorage`);
}

const NewsDetailSection = () => {
    const { news, loading, error } = useNewDetail();
    const navigate = useNavigate();
    const [relatedLimit, setRelatedLimit] = React.useState(5);

    if (loading) {
        return (
            <div className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: "var(--safe-top)" }}>
                <Skeleton className="h-8 w-2/3 mb-4" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <div className="mb-4">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6 mb-2" />
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
                <Skeleton className="h-6 w-1/3 mb-4" />
                <SkeletonList
                    count={3}
                    renderSkeleton={() => (
                        <div className="bg-white rounded shadow p-2 flex flex-col">
                            <Skeleton className="w-full h-32 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-1" />
                            <Skeleton className="h-5 w-2/3" />
                        </div>
                    )}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                />
            </div>
        );
    }
    if (error) {
        return <div className="text-red-500">Lỗi khi tải chi tiết tin tức.</div>;
    }
    if (!news) {
        return null;
    }

    // Only show up to relatedLimit news
    const relatedNewsToShow = news.relatedNews?.slice(0, relatedLimit) || [];
    const canShowMore = news.relatedNews && relatedLimit < news.relatedNews.length;

    return (
        <div className="p-4 mb-4">
            <h1 className="text-2xl font-bold">{news.title}</h1>
            <div className="flex items-center gap-2 text-[#FFA726] text-sm mb-2">
                {news.publishdate ? formatDate(news.publishdate) : ""}
            </div>
            <div className="text-sm text-black mb-4">
                <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: decodeAndFixImages(news.description) }} />
                <style>{`
                    .news-detail-content img {
                        max-width: 100%;
                        max-height: 100%;
                        width: auto !important;
                        height: auto !important;
                        display: block;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
            <div className="text-lg font-bold mb-4">Bài viết liên quan</div>
            <div className="flex flex-col gap-4">
                {relatedNewsToShow.map((item: any) => (
                    <button
                        key={item.id}
                        type="button"
                        className="bg-white rounded border-2 shadow p-2 flex flex-col cursor-pointer hover:bg-white/10 text-left focus:outline-none"
                        onClick={() => navigate(`/news/${item.id}`)}
                        tabIndex={0}
                        aria-label={item.title}
                    >
                        <div className="relative">
                            {item.thumbnail && (
                                <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover rounded" />
                            )}
                            <span className="absolute top-2 left-2 bg-[#E53935] text-white text-xs px-2 py-1 rounded">
                                Tin tức
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 mt-2">
                            {item.publishdate ? formatDate(item.publishdate) : ""}
                        </div>

                        <div className="font-semibold mt-1" style={{ wordBreak: "break-word" }}>
                            {item.title}
                        </div>
                    </button>
                ))}
            </div>
            {canShowMore && (
                <div className="flex justify-center mt-2 mb-2">
                    <button
                        type="button"
                        className="text-blue-700 text-sm font-semibold px-3 py-1 rounded hover:underline bg-transparent border-none cursor-pointer"
                        onClick={() => setRelatedLimit(relatedLimit + 5)}
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsDetailSection;