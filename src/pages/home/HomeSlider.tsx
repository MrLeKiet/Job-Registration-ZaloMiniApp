import Skeleton from "@/components/Skeleton";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "zmp-ui";
import { useHotNews } from "./useHome";

interface SliderImage {
    thumbnail: string;
    id: string;
}


const HomeSlider: React.FC = () => {
    // Helper to reset auto-slide interval with custom delay
    const resetSliderInterval = (delay: number = 3000) => {
        if (sliderInterval.current) {
            window.clearInterval(sliderInterval.current);
            sliderInterval.current = null;
        }
        if (sliderImages.length > 1) {
            sliderInterval.current = window.setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
            }, delay);
        }
    };
    const navigate = useNavigate();
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderInterval = useRef<number | null>(null);

    const { news, loading, error } = useHotNews();

    // Memoize the images array to prevent unnecessary reference changes
    const images = useMemo(() => {
        if (news.length === 0) return [];
        return news.map((item) => ({ thumbnail: item.thumbnail, id: item.id }));
    }, [news]);

    // Update slider images only if images content changes
    useEffect(() => {
        setSliderImages((prev) => {
            const prevIds = prev.map((img) => img.id).join(",");
            const newIds = images.map((img) => img.id).join(",");
            if (prevIds === newIds) return prev; // Avoid re-render if IDs are the same
            return images;
        });
    }, [images]);

    // Auto-slide effect
    useEffect(() => {
        if (sliderImages.length <= 1) return;
        resetSliderInterval(3000);
        return () => {
            if (sliderInterval.current) {
                window.clearInterval(sliderInterval.current);
                sliderInterval.current = null;
            }
        };
    }, [sliderImages.length]);

    // Loading / error states (must be after all hooks)
    if (loading) {
        return (
            <div className="w-full h-40 flex items-center justify-center">
                <Skeleton className="w-full h-40" />
            </div>
        );
    }

    // Swipe handlers

    // Loading / error states
    if (loading) {
        return <div className="w-full h-48 flex items-center justify-center">Đang tải slider...</div>;
    }

    if (error) {
        let message = "";
        if (typeof error === "string") message = error;
        else if (error instanceof Error) message = error.message;
        else message = "Lỗi không xác định.";
        return <div className="w-full h-48 flex items-center justify-center text-red-500">Lỗi khi tải slider: {message}</div>;
    }

    if (sliderImages.length === 0) return null;

    return (
        <div className="w-full flex justify-center items-center">
            <div
                className="relative w-full max-w-md h-48 overflow-hidden "
            >
                {/* Chevron left button */}
                {sliderImages.length > 1 && (
                    <button
                        type="button"
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-1 shadow border border-gray-200"
                        onClick={() => {
                            setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
                            resetSliderInterval(10000);
                        }}
                        style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}

                {/* Chevron right button */}
                {sliderImages.length > 1 && (
                    <button
                        type="button"
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-1 shadow border border-gray-200"
                        onClick={() => {
                            setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
                            resetSliderInterval(10000);
                        }}
                        style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}

                {sliderImages.map((img, idx) => (
                    <button
                        key={img.id}
                        type="button"
                        tabIndex={0}
                        aria-label={`Xem chi tiết tin hot ${idx + 1}`}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: idx === currentIndex ? "pointer" : "default",
                            opacity: idx === currentIndex ? 1 : 0,
                            zIndex: idx === currentIndex ? 10 : 0,
                            transition: "opacity 0.7s",
                        }}
                        onClick={() => navigate(`/news/${img.id}`)}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                navigate(`/news/${img.id}`);
                            }
                        }}
                        disabled={idx !== currentIndex}
                    >
                        <img
                            src={img.thumbnail}
                            alt={`Hot News ${idx}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                pointerEvents: idx === currentIndex ? "auto" : "none",
                            }}
                        />
                    </button>
                ))}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {sliderImages.map((img, idx) => (
                        <span
                            key={img.id}
                            className={`transition-all duration-300 shadow-md w-2.5 h-2.5 border border-white ${idx === currentIndex ? "bg-blue-500 opacity-100 scale-105" : "bg-gray-300 opacity-60 scale-90"}`}
                            style={{ opacity: idx === currentIndex ? 1 : 0.6, borderRadius: '0.15rem' }}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeSlider;